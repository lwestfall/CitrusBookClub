namespace Cbc.WebApi.Hubs;

using AutoMapper;
using Cbc.WebApi.Data;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Misc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Admin,Verified")]
public class LiveMeetingHub(CbcDbContext dbContext, IMapper mapper, ILogger<LiveMeetingHub> logger) : Hub
{
    [Authorize(Roles = "Admin")]
    public async Task UnstartMeeting(Guid meetingId)
    {
        var meeting = await dbContext.Meetings.FindAsync(meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        if (meeting.State != MeetingState.Started)
        {
            throw new InvalidOperationException($"Meeting with id {meetingId} has not started.");
        }

        meeting.State = null;

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUnstarted, meetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task StartMeeting(Guid meetingId)
    {
        var meeting = await dbContext.Meetings.FindAsync(meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        if (meeting.State != null)
        {
            throw new InvalidOperationException($"Meeting with id {meetingId} has already started.");
        }

        meeting.State = MeetingState.Started;

        await dbContext.SaveChangesAsync();

        var hostUser = this.Context.UserIdentifier;

#pragma warning disable CA1848 // Use the LoggerMessage delegates
#pragma warning disable CA2254 // Template should be a static expression
        logger.LogInformation($"Meeting with id {meetingId} started by {hostUser}.");
#pragma warning restore CA2254 // Template should be a static expression
#pragma warning restore CA1848 // Use the LoggerMessage delegates

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingStarted, meetingDto, this.Context.ConnectionId);
    }

    public async Task GetRecommendations(Guid meetingId)
    {
        var meeting = await dbContext.Meetings
            .Include(e => e.BookRecommendations)
            .SingleOrDefaultAsync(m => m.Id == meetingId)
                ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        var recommendations = mapper.Map<List<BookRecommendationDto>>(meeting.BookRecommendations);

        await this.Clients.Caller.SendAsync(ClientMethods.ReceiveRecommendations, recommendations);
    }

    public async Task JoinMeeting(string meetingId)
    {
        await this.Groups.AddToGroupAsync(this.Context.ConnectionId, meetingId);
        await this.Clients
            .Group(meetingId)
            .SendAsync(ClientMethods.UserJoined, this.Context.ConnectionId);
    }

    public async Task LeaveMeeting(string meetingId)
    {
        await this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, meetingId);
        await this.Clients
            .Group(meetingId)
            .SendAsync(ClientMethods.UserLeft, this.Context.ConnectionId);
    }

    public static class ClientMethods
    {
        public static string MeetingStarted => nameof(MeetingStarted);
        public static string ReceiveRecommendations => nameof(ReceiveRecommendations);
        public static string UserJoined => nameof(UserJoined);
        public static string UserLeft => nameof(UserLeft);
        public static string MeetingUnstarted => nameof(MeetingUnstarted);
    }
}

public static class LiveMeetingHubExtensions
{
    public static async Task RecommendationsChanged(
        this IHubContext<LiveMeetingHub> hubContext,
        CbcDbContext dbContext,
        IMapper mapper,
        Guid meetingId)
    {
        var meeting = await dbContext.Meetings
            .Include(e => e.BookRecommendations)
            .SingleOrDefaultAsync(m => m.Id == meetingId)
            ?? throw new ArgumentException($"Meeting with id {meetingId} not found.");

        var recommendations = mapper.Map<List<BookRecommendationDto>>(meeting.BookRecommendations);

        await hubContext.Clients
            .Group(meetingId.ToString())
            .SendAsync(LiveMeetingHub.ClientMethods.ReceiveRecommendations, recommendations);
    }
}
