namespace Cbc.WebApi.Controllers;

using Cbc.WebApi.Dtos;
using Cbc.WebApi.Hubs;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Verified")]
public class MeetingsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<MeetingDto>>> GetMeetings()
    {
        // note: avoid projection here because of the recursive relationship to last meeting
        var meetings = await this.CbcContext.Meetings
            .Include(e => e.PreviousMeeting!.WinningBook)
            .Include(e => e.WinningBook)
            .ToListAsync();

        return this.Ok(this.Mapper.Map<List<MeetingDto>>(meetings));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MeetingDto>> GetMeeting(Guid id)
    {
        var meeting = await LiveMeetingHubExtensions
            .GetMeeting(this.CbcContext, id);

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

    [HttpPut("{meetingId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<MeetingDto>> UpdateMeeting(Guid meetingId, DateTime dateTime)
    {
        var meeting = await this.CbcContext.Meetings.FindAsync(meetingId);

        if (meeting is null)
        {
            return this.NotFound();
        }

        meeting.DateTime = dateTime;
        await this.CbcContext.SaveChangesAsync();
        await this.LiveMeetingHubContext.MeetingChanged(this.CbcContext, this.Mapper, meetingId);
        return this.Ok(this.Mapper.Map<MeetingDto>(meeting));
    }

    [HttpDelete("{meetingId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteMeeting(Guid meetingId)
    {
        var meeting = await this.CbcContext.Meetings.FindAsync(meetingId);

        if (meeting is null)
        {
            return this.NotFound();
        }

        if (meeting.Status != null)
        {
            return this.BadRequest("Cannot delete a meeting that has already started.");
        }

        this.CbcContext.Meetings.Remove(meeting);
        await this.CbcContext.SaveChangesAsync();
        await this.LiveMeetingHubContext.MeetingDeleted(meetingId);
        return this.NoContent();
    }
}
