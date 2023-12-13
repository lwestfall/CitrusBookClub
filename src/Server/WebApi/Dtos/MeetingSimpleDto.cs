namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class MeetingSimpleDto : IMapFrom<Meeting>
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public Guid? WinningBookId { get; set; }

    public BookDto? WinningBook { get; set; }
}
