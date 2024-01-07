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
            .ToList();

        var pointsDict = new Dictionary<Book, int>();
        var bookCount = bookGroups.Count;

        foreach (var bookGroup in bookGroups)
        {
            var book = bookGroup.First().Book;
            var votes = bookGroup.ToList();
            pointsDict.Add(book, 0);

            votes.ForEach(v => pointsDict[book] += bookCount - v.Rank);
        }

        return pointsDict.SingleOrDefault(kvp => kvp.Value == pointsDict.Values.Max()).Key;
    }
}
