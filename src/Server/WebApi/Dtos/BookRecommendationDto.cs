namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class BookRecommendationDto : IMapFrom<BookRecommendation>
{
    public BookDto Book { get; set; } = null!;

    public MeetingSimpleDto Meeting { get; set; } = null!;
}
