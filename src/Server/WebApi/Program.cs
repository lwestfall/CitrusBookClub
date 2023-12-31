using System.Reflection;
using System.Security.Claims;
using Cbc.WebApi.Data;
using Cbc.WebApi.Helpers;
using Cbc.WebApi.Hubs;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Serilog;
using Serilog.Extensions.Logging;
using Serilog.Filters;

var builder = WebApplication.CreateBuilder(args);
var config = ApplyCbcConfiguration(builder.Configuration, builder.Environment.EnvironmentName).Build();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(config)
    .Filter.ByExcluding(
        Matching.WithProperty<string>("RequestMethod", v =>
            "OPTIONS".Equals(v, StringComparison.OrdinalIgnoreCase)))
    .Enrich.FromLogContext()
    .Enrich.WithProperty("ApplicationName", typeof(Program)!.Assembly!.GetName().Name!)
    .Enrich.WithMachineName()
    .Enrich.WithEnvironmentUserName()
    .Enrich.WithEnvironmentName()
    .CreateLogger();

builder.Host.UseSerilog(Log.Logger);

builder.Services
    .AddSingleton<ILoggerFactory>(services => new SerilogLoggerFactory(Log.Logger, false))
    .AddSingleton(builder.Configuration);

builder.Services.AddDbContext<CbcDbContext>(options => GetCbcDbContextOptions(config, options));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSwaggerGen(options =>
    {
        options.SupportNonNullableReferenceTypes();
        options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
        options.UseAllOfToExtendReferenceSchemas();
        options.SchemaFilter<RequiredNotNullableSchemaFilter>();

        options.DocumentFilter<AdditionalSchemaDefinitionsDocumentFilter>();

        // options.AddSecurityDefinition("Bearer,", new OpenApiSecurityScheme
        // {
        //     Description = "Please insert your JWT Token into field",
        //     Name = "Authorization",
        //     Type = SecuritySchemeType.ApiKey,
        //     In = ParameterLocation.Header,
        //     Scheme = "Bearer",
        //     BearerFormat = "JWT"
        // });

        // options.AddSecurityRequirement(new OpenApiSecurityRequirement{
        //     {
        //         new OpenApiSecurityScheme{
        //             Reference = new OpenApiReference{
        //                 Type = ReferenceType.SecurityScheme,
        //                 Id = "Bearer"
        //             }
        //         },
        //         new string[]{}
        //     }
        // });
    });
}

builder.Services
    .AddAuthorization(options => options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build())
    .AddCors(options => options
        .AddPolicy(
            "AllowSpecificOrigin",
            builder => builder
                    .WithOrigins(config["AllowedOrigins"]!)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = "https://accounts.google.com";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = "https://accounts.google.com",
        ValidAudience = config["Authentication:Google:ClientId"]!
    };

    options.Events = new JwtBearerEvents();

    options.Events.OnMessageReceived += async (context) =>
    {
        var accessToken = context.Request.Query["access_token"];

        if (!string.IsNullOrEmpty(accessToken))
        {
            context.Token = accessToken;
        }

        await Task.CompletedTask;
    };

    options.Events.OnTokenValidated += async (context) =>
    {
        var email = context.Principal?.FindFirstValue(ClaimTypes.Email);

        if (email is null)
        {
            context.Fail("Unauthorized. Email claim is not present");
            return;
        }

        var dbContext = context.HttpContext.RequestServices.GetRequiredService<CbcDbContext>();

        var user = await dbContext.Users
            .Include(e => e.Roles)
            .FirstOrDefaultAsync(u => u.EmailAddress == email);

        if (user is null)
        {
            dbContext.Users.Add(new User
            {
                EmailAddress = email,
                FirstName = context.Principal?.FindFirstValue(ClaimTypes.GivenName) ?? "Unknown",
                LastName = context.Principal?.FindFirstValue(ClaimTypes.Surname) ?? "Unknown"
            });

            dbContext.SaveChanges();
            context.Success();
            return;
        }

        var roles = user.Roles.Select(e => e.Role);

        var claims = roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList();
        claims.Add(new Claim(ClaimTypes.Email, email));
        context.Principal?.AddIdentity(new ClaimsIdentity(claims));
        context.Success();
    };
}
).AddGoogle(googleOptions =>
{
    googleOptions.ClientId = config["Authentication:Google:ClientId"]!;
    googleOptions.ClientSecret = config["Authentication:Google:ClientSecret"]!;
});

var app = builder.Build();

// Not applicable in our docker environment
// app.Use(async (ctx, next) =>
// {
//     using (LogContext.PushProperty("ClientIPAddress", ctx.Connection.RemoteIpAddress))
//     {
//         await next(ctx);
//     }
// });

app.UseSerilogRequestLogging();

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();
}

// in docker behind a reverse proxy, so we don't need to redirect to https
// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<LiveMeetingHub>("/hubs/livemeeting");

app.Run();


public partial class Program
{
    public static DbContextOptionsBuilder GetCbcDbContextOptions(IConfiguration config, DbContextOptionsBuilder optionsBuilder)
    {
        var connStrBuilder = new NpgsqlConnectionStringBuilder(config.GetConnectionString("CbcDbContext"))
        {
            Password = config["DbPassword"],
            Host = config["DbHost"],
            Port = config.GetValue<int>("DbPort")
        };

        optionsBuilder.UseNpgsql(connStrBuilder.ConnectionString);

        return optionsBuilder;
    }

    public static IConfigurationBuilder ApplyCbcConfiguration(IConfigurationBuilder configBuilder, string env)
    {
        var appSettings = "appsettings.Development.json";

        if (env == "Production")
        {
            appSettings = "appsettings.json";
        }
        else if (env == "Staging")
        {
            appSettings = "appsettings.Staging.json";
        }

        return configBuilder
            .SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location!)!)
            .AddUserSecrets<Program>()
            .AddEnvironmentVariables()
            .AddJsonFile(appSettings, false, true);
    }
}
