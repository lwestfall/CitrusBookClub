namespace Cbc.WebApi.Models.Entities;

public class Book
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string? Description { get; set; }

    public string? UserEmail { get; set; } = null!;

    public string? ThumbnailLink { get; set; }

    public string? Isbn { get; set; }

    public int? PageCount { get; set; }

    public User? User { get; set; }
}
