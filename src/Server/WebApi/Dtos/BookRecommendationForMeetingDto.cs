namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class BookRecommendationForMeetingDto : IMapFrom<BookRecommendation>
{
    public BookDto Book { get; set; } = null!;

    public UserSimpleDto RecommendedBy { get; set; } = null!;
}
