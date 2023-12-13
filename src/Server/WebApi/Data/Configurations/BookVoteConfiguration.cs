namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookVoteConfiguration : IEntityTypeConfiguration<BookVote>
{
    public void Configure(EntityTypeBuilder<BookVote> builder)
    {
        builder.ToTable(nameof(BookVote));

        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Book)
            .WithMany()
            .HasForeignKey(bookVote => bookVote.BookId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.VoteBy)
            .WithMany()
            .HasForeignKey(e => e.MemberEmail)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
