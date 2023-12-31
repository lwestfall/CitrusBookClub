namespace Cbc.WebApi.Dtos;

using AutoMapper;
using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class MeetingDto : IMapFrom<Meeting>
{
    public Guid Id { get; set; }

    public DateTime DateTime { get; set; }

    public BookDto? WinningBook { get; set; }

    public MeetingDto? PreviousMeeting { get; set; }

    public string? State { get; set; }

    public List<BookVoteDto> Votes { get; set; } = [];

    public List<BookRecommendationForMeetingDto> BookRecommendations { get; set; } = [];

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Meeting, MeetingDto>()
            .ForMember(d => d.State, opt => opt.MapFrom(s => s.State.ToString()));
    }
}
