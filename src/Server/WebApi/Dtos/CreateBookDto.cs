namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class CreateBookDto : IMapTo<Book>
{
    public Guid? UpdateId { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string? Description { get; set; }

    public string? ThumbnailLink { get; set; }

    public string? Isbn { get; set; }

    public int? PageCount { get; set; }
}
