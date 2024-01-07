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

    public string? Status { get; set; }

    public List<BookVoteDto> Votes { get; set; } = [];

    public List<BookRecommendationForMeetingDto> BookRecommendations { get; set; } = [];

    public List<MeetingUserStateDto> UserStates { get; set; } = [];

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Meeting, MeetingDto>()
            .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status.ToString()));
    }
}
