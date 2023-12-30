namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookRecommendationConfiguration : IEntityTypeConfiguration<BookRecommendation>
{
    public void Configure(EntityTypeBuilder<BookRecommendation> builder)
    {
        builder.ToTable(nameof(BookRecommendation));

        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Book)
            .WithMany()
            .HasForeignKey(bookRecommendation => bookRecommendation.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.RecommendedBy)
            .WithMany()
            .HasForeignKey(e => e.MemberEmail)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
