namespace Cbc.WebApi.Dtos;

using AutoMapper;
using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class UserDto : IMapFrom<User>
{
    public string EmailAddress { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public List<string> Roles { get; set; } = [];

    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, UserDto>()
            .ForMember(d => d.Roles, opt => opt.MapFrom(s => s.Roles.Select(e => e.Role)));
    }
}
