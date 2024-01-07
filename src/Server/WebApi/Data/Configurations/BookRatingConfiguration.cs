namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookRatingConfiguration : IEntityTypeConfiguration<BookRating>
{
    public void Configure(EntityTypeBuilder<BookRating> builder)
    {
        builder
            .ToTable(nameof(BookRating))
            .HasKey(e => new { e.BookId, e.UserEmail });

        builder.Property(e => e.UserEmail);
    }
}
