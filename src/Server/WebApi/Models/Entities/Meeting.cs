namespace Cbc.WebApi.Models.Entities;

using Cbc.WebApi.Models.Misc;

public class Meeting
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public Guid? PreviousMeetingId { get; set; }

    public Guid? WinningBookId { get; set; }

    public Meeting? PreviousMeeting { get; set; }

    public Book? WinningBook { get; set; }

    public List<BookVote> Votes { get; set; } = [];

    public MeetingState? State { get; set; }

    public List<BookRecommendation> BookRecommendations { get; set; } = [];
}
