namespace Cbc.WebApi.Models.Entities;

public class BookVote
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public string MemberEmail { get; set; } = null!;

    public Guid BookId { get; set; }

    public int Rank { get; set; }

    public Book Book { get; set; } = null!;

    public User VoteBy { get; set; } = null!;
}
