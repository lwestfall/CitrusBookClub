namespace Cbc.WebApi.Controllers;

using AutoMapper.QueryableExtensions;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Verified")]
public class MeetingsController : ApiControllerBase
{
    [HttpGet("next")]
    public async Task<ActionResult<MeetingSimpleDto>> GetNextMeeting()
    {
        var meeting = await this.CbcContext.Meetings
            .Where(m => m.DateTime > DateTime.UtcNow)
            .OrderBy(m => m.DateTime)
            .ProjectTo<MeetingDto>(this.Mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (meeting is null)
        {
            return this.NotFound();
        }

        return this.Ok(meeting);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MeetingDto>> GetMeeting(Guid id)
    {
        var meeting = await this.CbcContext.Meetings
            .ProjectTo<MeetingDto>(this.Mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (meeting is null)
        {
            return this.NotFound();
        }

        return this.Ok(meeting);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<MeetingDto>> CreateMeeting(DateTime dateTime)
    {
        var meeting = new Meeting { DateTime = dateTime };
        this.CbcContext.Meetings.Add(meeting);
        await this.CbcContext.SaveChangesAsync();
        return this.CreatedAtAction(nameof(GetMeeting), new { id = meeting.Id }, this.Mapper.Map<MeetingDto>(meeting));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<MeetingDto>> UpdateMeeting(Guid id, DateTime dateTime)
    {
        var meeting = await this.CbcContext.Meetings.FindAsync(id);

        if (meeting is null)
        {
            return this.NotFound();
        }

        meeting.DateTime = dateTime;
        await this.CbcContext.SaveChangesAsync();
        return this.Ok(this.Mapper.Map<MeetingDto>(meeting));
    }
}
