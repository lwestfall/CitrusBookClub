namespace Cbc.WebApi.Data;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

public class CbcDbContext(DbContextOptions<CbcDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CbcDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Book> Books { get; set; }

    public DbSet<BookVote> BookVotes { get; set; }

    public DbSet<Meeting> Meetings { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<BookRecommendation> BookRecommendations { get; set; }
}
