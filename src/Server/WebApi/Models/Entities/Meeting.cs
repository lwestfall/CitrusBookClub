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

    public MeetingStatus? Status { get; set; }

    public List<BookRecommendation> BookRecommendations { get; set; } = [];

    public List<MeetingUserState> UserStates { get; set; } = [];

    public Book? CalculateWinningBook()
    {
        var bookGroups = this.Votes
            .GroupBy(v => v.BookId)
            .Select(g => new
            {
                g.First().Book,
                RankSum = g.Sum(v => v.Rank)
            })
            .OrderByDescending(g => g.RankSum)
            .Select(x => x.Book)
            .ToList();

        return bookGroups.FirstOrDefault();
    }
}
