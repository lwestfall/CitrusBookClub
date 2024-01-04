namespace Cbc.WebApi.Dtos;

using AutoMapper;
using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class MeetingSimpleDto : IMapFrom<Meeting>
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public Guid? WinningBookId { get; set; }

    public string? Status { get; set; }

    public BookDto? WinningBook { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Meeting, MeetingSimpleDto>()
            .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status.ToString()));
    }
}
