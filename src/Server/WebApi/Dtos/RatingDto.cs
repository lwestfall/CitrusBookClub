namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Mapping;
using Cbc.WebApi.Models.Entities;

public class RatingDto : IMapBoth<BookRating>
{
    public Guid BookId { get; set; }

    public int Rating { get; set; }
}
