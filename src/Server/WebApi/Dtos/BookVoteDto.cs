namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class BookVoteDto : IMapFrom<BookVote>
{
    public int Rank { get; set; }

    public BookDto Book { get; set; } = null!;
}
