namespace Cbc.WebApi.Models.Entities;

using Cbc.WebApi.Models.Misc;

public class MeetingUserState
{
    public Guid MeetingId { get; set; }

    public string UserEmailAddress { get; set; } = null!;

    public MeetingUserStatus Status { get; set; }

    public User User { get; set; } = null!;
}
