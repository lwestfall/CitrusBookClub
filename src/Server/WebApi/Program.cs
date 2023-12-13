using System.Security.Claims;
using Cbc.WebApi.Data;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

builder.Services.AddDbContext<CbcDbContext>(options =>
{
    var connStrBuilder = new NpgsqlConnectionStringBuilder(config.GetConnectionString("CbcDbContext"))
    {
        Password = builder.Configuration["DbPassword"],
        Host = config["DbHost"],
        Port = config.GetValue<int>("DbPort")
    };

    options.UseNpgsql(connStrBuilder.ConnectionString);
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
    options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");

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

builder.Services.AddAuthorization(options => options.FallbackPolicy = new AuthorizationPolicyBuilder()
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

        var claims = roles.Select(role => new Claim(ClaimTypes.Role, role));
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

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
