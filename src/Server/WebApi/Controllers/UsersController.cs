namespace Cbc.WebApi.Controllers;
using System.Security.Claims;
using System.Text;
using AutoMapper.QueryableExtensions;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Admin")]
public class UsersController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        return await this.CbcContext
            .Users
            .ProjectTo<UserDto>(this.Mapper.ConfigurationProvider)
            .ToListAsync();
    }

    [HttpGet("/me")]
    [AllowAnonymous]
    public async Task<ActionResult<UserDto>> GetAuthenticatedUser()
    {
        var email = this.User.FindFirstValue(ClaimTypes.Email);

        if (email is null)
        {
            return this.Unauthorized();
        }

        var user = await this.CbcContext.Users.FindAsync(email);

        if (user is null)
        {
            return this.NotFound();
        }

        return this.Ok(this.Mapper.Map<UserDto>(user));
    }

    [HttpPut("/me")]
    [AllowAnonymous]
    public async Task<ActionResult<UserDto>> UpdateAuthenticatedUser([FromBody] UpdateUserDto updateUserDto)
    {
        var email = this.User.FindFirstValue(ClaimTypes.Email);

        if (email is null)
        {
            return this.Unauthorized();
        }

        var user = await this.CbcContext.Users.FindAsync(email);

        if (user is null)
        {
            return this.NotFound();
        }

        this.Mapper.Map(updateUserDto, user);
        await this.CbcContext.SaveChangesAsync();
        return this.Ok(this.Mapper.Map<UserDto>(user));
    }

    [HttpPut("{b64Email}")]
    public async Task<ActionResult<UserDto>> UpdateUser(string b64Email, [FromBody] UpdateUserDto updateUserDto)
    {
        var email = Encoding.UTF8.GetString(Convert.FromBase64String(b64Email));

        var user = await this.CbcContext.Users
            .SingleOrDefaultAsync(u => u.EmailAddress == email);

        if (user == null)
        {
            return this.NotFound();
        }

        this.Mapper.Map(updateUserDto, user);
        await this.CbcContext.SaveChangesAsync();
        return this.Ok(this.Mapper.Map<UserDto>(user));
    }

    [HttpDelete("{b64Email}")]
    public async Task<ActionResult<UserDto>> DeleteUser(string b64Email)
    {
        var email = Encoding.UTF8.GetString(Convert.FromBase64String(b64Email));
        var user = await this.CbcContext.Users.FindAsync(email);

        if (user == null)
        {
            return this.NotFound();
        }

        this.CbcContext.Users.Remove(user);
        await this.CbcContext.SaveChangesAsync();
        return this.NoContent();
    }

    [HttpPut("{b64Email}/roles")]
    public async Task<ActionResult<UserDto>> UpdateUserRoles(string b64Email, [FromBody] List<string> roles)
    {
        var email = Encoding.UTF8.GetString(Convert.FromBase64String(b64Email));
        var user = await this.CbcContext.Users.Include(e => e.Roles).SingleOrDefaultAsync(e => e.EmailAddress == email);
        if (user == null)
        {
            return this.NotFound();
        }

        var rolesToAdd = roles.Except(user.Roles.Select(e => e.Role)).ToList();
        var rolesToRemove = user.Roles.Select(e => e.Role).Except(roles).ToList();

        foreach (var role in rolesToAdd)
        {
            user.Roles.Add(new UserRole { Role = role });
        }

        foreach (var role in rolesToRemove)
        {
            user.Roles.Remove(user.Roles.Single(e => e.Role == role));
        }

        await this.CbcContext.SaveChangesAsync();
        return this.Ok(this.Mapper.Map<UserDto>(user));
    }
}
