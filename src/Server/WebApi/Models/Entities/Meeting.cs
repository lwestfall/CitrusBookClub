namespace Cbc.WebApi.Models.Entities;

public class Meeting
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public Guid? WinningBookId { get; set; }

    public Book? WinningBook { get; set; }

    public List<BookVote> Votes { get; set; } = [];
}
