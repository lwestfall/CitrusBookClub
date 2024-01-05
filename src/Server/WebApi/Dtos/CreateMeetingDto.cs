namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class CreateMeetingDto : IMapTo<Meeting>
{
    public Guid? PreviousMeetingId { get; set; }

    public DateTime DateTime { get; set; }
}
