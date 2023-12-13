namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.ToTable(nameof(UserRole));

        builder.HasKey(e => new { e.EmailAddress, e.Role });

        builder.Property(e => e.EmailAddress)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(e => e.Role)
            .HasMaxLength(50)
            .IsRequired();
    }
}
