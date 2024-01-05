namespace Cbc.WebApi.Hubs;

using System.Security.Claims;
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
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId, MeetingStatus.Started);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var hostUser = this.Context.UserIdentifier;

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingStarted, meetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task StartVoting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId, MeetingStatus.Voting);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task CloseMeeting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId, MeetingStatus.Closed);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var winningBook = meeting.CalculateWinningBook();

        meeting.WinningBook = winningBook;
        var meetingDto = mapper.Map<MeetingDto>(meeting);

        try
        {
            await this.Clients
                .Group(meetingId.ToString() + "-presenter")
                .SendAsync(ClientMethods.AnnounceWinner, meetingDto, this.Context.ConnectionId);

            await Task.Delay(TimeSpan.FromSeconds(5));

            await this.Clients
                .All
                .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
        }
        catch (Exception)
        {
            // todo: log
        }
        finally
        {
            await dbContext.SaveChangesAsync();
        }
    }

    [Authorize(Roles = "Admin")]
    public async Task CreateNextMeeting(CreateMeetingDto meetingDto)
    {
        if (!meetingDto.PreviousMeetingId.HasValue)
        {
            await this.Error($"Previous meeting id is required.");
            return;
        }

        var previousMeeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingDto.PreviousMeetingId.Value);

        if (previousMeeting is null)
        {
            await this.Error($"Previous meeting with id {meetingDto.PreviousMeetingId} not found.");
            return;
        }

        var meeting = new Meeting
        {
            DateTime = meetingDto.DateTime,
            PreviousMeeting = previousMeeting
        };

        dbContext.Meetings.Add(meeting);
        await dbContext.SaveChangesAsync();

        var previousMeetingDto = mapper.Map<MeetingDto>(previousMeeting);
        var newMeetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, previousMeetingDto, this.Context.ConnectionId);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, newMeetingDto, this.Context.ConnectionId);
    }

    [Authorize(Roles = "Admin")]
    public async Task JoinMeetingAsPresenter(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Groups
            .AddToGroupAsync(this.Context.ConnectionId, meetingId.ToString() + "-presenter");

        await this.Clients
            .Caller
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    public async Task JoinMeeting(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var user = await this.GetUser();

        if (user is null)
        {
            return;
        }

        if (!meeting.UserStates.Any(e => e.UserEmailAddress == user.EmailAddress))
        {
            meeting.UserStates.Add(new MeetingUserState
            {
                Status = MeetingUserStatus.Joined,
                User = user
            });
        }

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto);
    }

    public async Task ChangeVote(Guid meetingId, CreateBookVoteDto[] votes, bool confirm)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var user = await this.GetUser();

        if (user is null)
        {
            return;
        }

        if (meeting.Status != MeetingStatus.Voting)
        {
            await this.Error($"Meeting with id {meetingId} is not in voting state.");
            return;
        }

        var voteEntities = votes.Select(v => new BookVote
        {
            BookId = v.BookId,
            MeetingId = meetingId,
            MemberEmail = user.EmailAddress,
            Rank = v.Rank
        }).ToList();

        var existingVotes = await dbContext.BookVotes
            .Where(v => v.MeetingId == meetingId && v.MemberEmail == user.EmailAddress)
            .ToListAsync();

        // todo: compare existing votes with new votes and only update if there are changes

        dbContext.BookVotes.RemoveRange(existingVotes);
        dbContext.BookVotes.AddRange(voteEntities);

        var userState = meeting.UserStates.SingleOrDefault(e => e.UserEmailAddress == user.EmailAddress);

        if (userState is null)
        {
            await this.Error($"User {user.EmailAddress} not found in meeting {meetingId}.");
            return;
        }

        userState.Status = confirm ? MeetingUserStatus.Voted : MeetingUserStatus.Joined;

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .Caller
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);

        if (confirm)
        {
            meetingDto.Votes.Clear();
            await this.Clients
                .All
                .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
        }
    }

    public async Task UnconfirmVote(Guid meetingId)
    {
        var meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        var user = await this.GetUser();

        if (user is null)
        {
            return;
        }

        var userState = meeting.UserStates.SingleOrDefault(e => e.UserEmailAddress == user.EmailAddress);

        if (userState is null)
        {
            await this.Error($"User {user.EmailAddress} not found in meeting {meetingId}.");
            return;
        }

        userState.Status = MeetingUserStatus.Joined;

        await dbContext.SaveChangesAsync();

        var meetingDto = mapper.Map<MeetingDto>(meeting);

        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    public async Task ResetMeeting(Guid meetingId)
    {
        var meeting = await dbContext.Meetings
            .Include(m => m.UserStates)
            .SingleOrDefaultAsync(m => m.Id == meetingId);

        if (meeting is null)
        {
            await this.Error($"Meeting with id {meetingId} not found.");
            return;
        }

        meeting.Status = null;
        meeting.UserStates.Clear();
        meeting.WinningBookId = null;

        await dbContext.SaveChangesAsync();

        meeting = await LiveMeetingHubExtensions.GetMeeting(dbContext, meetingId);

        var meetingDto = mapper.Map<MeetingDto>(meeting);
        await this.Clients
            .All
            .SendAsync(ClientMethods.MeetingUpdate, meetingDto, this.Context.ConnectionId);
    }

    private Task Error(string message) => this.Clients.Caller.SendAsync("Error", message);

    private async Task<User?> GetUser()
    {
        var email = this.Context.User?.FindFirst(ClaimTypes.Email)?.Value;

        if (email is null)
        {
            await this.Error("Email claim not found.");
            return null;
        }

        var user = await dbContext.Users.FindAsync(email);

        if (user is null)
        {
            await this.Error($"User not found with email {email}");
            return null;
        }

        return user;
    }

    public static class ClientMethods
    {
        public static string MeetingStarted => nameof(MeetingStarted);
        public static string MeetingUpdate => nameof(MeetingUpdate);
        public static string AnnounceWinner => nameof(AnnounceWinner);
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
            .All
            .SendAsync(LiveMeetingHub.ClientMethods.MeetingUpdate, meetingDto);
    }

    public static async Task<Meeting?> GetMeeting(CbcDbContext dbContext, Guid meetingId, MeetingStatus? nextState = null)
    {
        var meeting = await dbContext.Meetings
            .Include(e => e.PreviousMeeting!.WinningBook)
            .Include(e => e.UserStates)
                .ThenInclude(e => e.User)
            .SingleOrDefaultAsync(m => m.Id == meetingId);

        if (meeting is null)
        {
            return null;
        }

        await dbContext.Entry(meeting)
            .Collection(e => e.UserStates)
            .Query()
                .Include(e => e.User)
            .LoadAsync();

        if (nextState is not null && meeting.Status != nextState)
        {
            meeting.Status = nextState.Value;
            await dbContext.SaveChangesAsync();
        }

        if (meeting.Status >= MeetingStatus.Started)
        {
            await dbContext.Entry(meeting)
                .Collection(e => e.BookRecommendations)
                .Query()
                    .Include(e => e.Book)
                    .Include(e => e.RecommendedBy)
                    .OrderBy(e => e.Book.Title) // this doesn't work?
                .LoadAsync();
        }

        if (meeting.Status == MeetingStatus.Closed)
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

        // reorder book recommendations by title
        meeting.BookRecommendations =
        [
            .. meeting.BookRecommendations.OrderBy(e => e.Book.Title)
        ];

        return meeting;
    }
}
