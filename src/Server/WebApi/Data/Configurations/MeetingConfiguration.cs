namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MeetingConfiguration : IEntityTypeConfiguration<Meeting>
{
    public void Configure(EntityTypeBuilder<Meeting> builder)
    {
        builder.ToTable(nameof(Meeting));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.DateTime)
            .IsRequired();

        builder.HasOne(e => e.WinningBook)
            .WithOne()
            .HasForeignKey<Meeting>(e => e.WinningBookId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.PreviousMeeting)
            .WithOne()
            .HasForeignKey<Meeting>(e => e.PreviousMeetingId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(e => e.Votes)
            .WithOne()
            .HasForeignKey(e => e.MeetingId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.BookRecommendations)
            .WithOne(e => e.Meeting)
            .HasForeignKey(e => e.MeetingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
