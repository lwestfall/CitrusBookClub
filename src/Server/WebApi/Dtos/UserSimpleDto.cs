namespace Cbc.WebApi.Dtos;

using Cbc.WebApi.Interfaces;
using Cbc.WebApi.Models.Entities;

public class UserSimpleDto : IMapFrom<User>
{
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;
}
