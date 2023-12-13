namespace Cbc.WebApi.Models.Entities;

public class BookRecommendation
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public string MemberEmail { get; set; } = null!;

    public Guid BookId { get; set; }

    public Book Book { get; set; } = null!;

    public User RecommendedBy { get; set; } = null!;
}
