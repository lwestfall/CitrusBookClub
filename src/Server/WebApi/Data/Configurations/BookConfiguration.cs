namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable(nameof(Book));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Title)
            .HasMaxLength(100);

        builder.Property(e => e.Author)
            .HasMaxLength(100);

        builder.Property(e => e.Description)
            .HasMaxLength(1500);

        builder.Property(e => e.UserEmail)
            .HasMaxLength(256);

        builder.Property(e => e.ThumbnailLink)
            .HasMaxLength(1000);

        builder.Property(e => e.Isbn)
            .HasMaxLength(20);

        builder.HasOne(e => e.User)
            .WithMany(e => e.Books)
            .HasForeignKey(e => e.UserEmail)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
