namespace Cbc.WebApi.Data.Configurations;

using Cbc.WebApi.Models.Entities;
using Cbc.WebApi.Models.Misc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MeetingUserStateConfiguration : IEntityTypeConfiguration<MeetingUserState>
{
    public void Configure(EntityTypeBuilder<MeetingUserState> builder)
    {
        builder
            .ToTable(nameof(MeetingUserState))
            .HasKey(e => new { e.MeetingId, e.UserEmailAddress });

        builder.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserEmailAddress)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Property(e => e.Status)
            .HasDefaultValue(MeetingUserStatus.Joined)
            .HasConversion(
                v => v.ToString(),
                v => (MeetingUserStatus)Enum.Parse(typeof(MeetingUserStatus), v!));
    }
}
