namespace Cbc.WebApi.Hubs;

using AutoMapper;
using Cbc.WebApi.Data;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Cbc.WebApi.Models.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Admin,Verified")]
public class LiveMeetingHub(CbcDbContext dbContext, IMapper mapper/*, ILogger<LiveMeetingHub> logger*/) : Hub
{
    [Authorize(Roles = "Admin")]
    public async Task StartMeeting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        meeting.State = MeetingState.Started;

        await dbContext.SaveChangesAsync();

        var hostUser = this.Context.UserIdentifier;

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingStarted, meetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task StartVoting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        if (meeting.State != MeetingState.Started)
        {
            throw new InvalidOperationException($"Meeting with id {meetingId} is not in started state.");
        }

        meeting.State = MeetingState.Voting;

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .Group(meetingId.ToString())
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task CloseMeeting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        if (meeting.State != MeetingState.Voting)
        {
            throw new InvalidOperationException($"Meeting with id {meetingId} is not in voting state.");
        }

        meeting.State = MeetingState.Closed;

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .Group(meetingId.ToString())
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    public async Task JoinMeeting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Groups.AddToGroupAsync(this.Context.ConnectionId, meetingId.ToString());
        await this.Clients
            .Group(meetingId.ToString())
            .SendAsync(ClientMethods.UserJoined, this.Context.ConnectionId);

        await this.Clients.Caller.SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    public async Task LeaveMeeting(Guid meetingId) => await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, meetingId.ToString());

    public static class ClientMethods
    {
        public static string MeetingStarted => nameof(MeetingStarted);
        public static string ReceiveRecommendations => nameof(ReceiveRecommendations);
        public static string MeetingUpdate => nameof(MeetingUpdate);
        public static string UserJoined => nameof(UserJoined);
    }
}

public static class LiveMeetingHubExtensions
{
    public static async Task MeetingChanged(
        this IHubContext<LiveMeetingHub> hubContext,
        CbcDbContext dbContext,
        IMapper mapper,
        Guid meetingId)
    {
        var meeting = await GetMeeting(dbContext, meetingId);

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await hubContext.Clients
            .Group(meetingId.ToString())
            .SendAsync(LiveMeetingHub.ClientMethods.MeetingUpdate, meetingDto);
    }

    public static async Task<Meeting?> GetMeeting(CbcDbContext dbContext, Guid meetingId)
    {
        var meeting = await dbContext.Meetings
            .Include(e => e.PreviousMeeting)
                .ThenInclude(e => e!.WinningBook)
            .SingleOrDefaultAsync(m => m.Id == meetingId);

        if (meeting is null)
        {
            return null;
        }

        if (meeting.State is MeetingState.Started or MeetingState.Voting)
        {
            await dbContext.Entry(meeting)
                .Collection(e => e.BookRecommendations)
                .Query()
                    .Include(e => e.Book)
                    .Include(e => e.RecommendedBy)
                .LoadAsync();
        }

        if (meeting.State == MeetingState.Closed)
        {
            await dbContext.Entry(meeting)
                .Reference(e => e.WinningBook)
                .LoadAsync();

            await dbContext.Entry(meeting)
                .Collection(e => e.Votes)
                .Query()
                    .Include(e => e.Book)
                .LoadAsync();
        }

        return meeting;
    }
}
