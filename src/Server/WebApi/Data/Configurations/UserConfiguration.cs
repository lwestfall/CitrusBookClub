namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable(nameof(User));

        builder.HasKey(e => e.EmailAddress);

        builder.Property(e => e.EmailAddress)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(e => e.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(e => e.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasMany(e => e.Roles)
            .WithOne()
            .HasForeignKey(e => e.EmailAddress)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
