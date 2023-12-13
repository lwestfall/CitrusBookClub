namespace Cbc.WebApi.Models.Entities;

public class User
{
    public string EmailAddress { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public List<UserRole> Roles { get; set; } = [];

    public List<Book> Books { get; set; } = [];
}
