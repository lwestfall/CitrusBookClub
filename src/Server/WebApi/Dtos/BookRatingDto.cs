namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Mapping;
using Cbc.WebApi.Models.Entities;

public class BookRatingDto : IMapBoth<BookRating>
{
    public Guid BookId { get; set; }

    public int Rating { get; set; }
}
