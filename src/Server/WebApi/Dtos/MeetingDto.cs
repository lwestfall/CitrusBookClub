namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class MeetingDto : IMapFrom<Meeting>
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public BookDto? WinningBook { get; set; }

    public MeetingDto? PreviousMeeting { get; set; }

    public List<BookVoteDto> Votes { get; set; } = [];
}
