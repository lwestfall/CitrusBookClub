namespace Cbc.WebApi.Controllers;

using System.Security.Claims;
using AutoMapper;
using Cbc.WebApi.Data;
using Cbc.WebApi.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected CbcDbContext CbcContext
        => this.HttpContext.RequestServices.GetRequiredService<CbcDbContext>();

    protected IMapper Mapper
        => this.HttpContext.RequestServices.GetRequiredService<IMapper>();

    protected IConfiguration Configuration
        => this.HttpContext.RequestServices.GetRequiredService<IConfiguration>();

    protected string? GetEmail()
        => this.User!.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

    protected IHubContext<LiveMeetingHub> LiveMeetingHubContext
        => this.HttpContext.RequestServices.GetRequiredService<IHubContext<LiveMeetingHub>>();
}
