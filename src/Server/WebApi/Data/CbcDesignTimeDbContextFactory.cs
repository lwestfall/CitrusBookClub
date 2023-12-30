namespace Cbc.WebApi.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class CbcDesignTimeDbContextFactory : IDesignTimeDbContextFactory<CbcDbContext>
{
    public CbcDbContext CreateDbContext(string[] args)
    {
        var configBuilder = new ConfigurationBuilder();

        var config = Program.ApplyCbcConfiguration(configBuilder, args.FirstOrDefault() ?? "Development").Build();

        var optionsBuilder = new DbContextOptionsBuilder();

        optionsBuilder = Program.GetCbcDbContextOptions(config, optionsBuilder);

        return new CbcDbContext(optionsBuilder.Options);
    }
}
