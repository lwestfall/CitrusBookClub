namespace Cbc.WebApi.Models.Entities;

public class BookRating
{
    public Guid BookId { get; set; }

    public string UserEmail { get; set; } = null!;

    public int Rating { get; set; }
}
