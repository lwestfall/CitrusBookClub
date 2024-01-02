namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class MeetingUserStateDto : IMapFrom<MeetingUserState>
{
    public string Status { get; set; } = null!;

    public UserDto User { get; set; } = null!;
}
