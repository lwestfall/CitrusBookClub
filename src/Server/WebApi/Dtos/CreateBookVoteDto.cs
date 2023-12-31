namespace Cbc.WebApi.Dtos;

public class CreateBookVoteDto // don't map
{
    public int Rank { get; set; }

    public Guid BookId { get; set; }

    public Guid MeetingId { get; set; }
}
