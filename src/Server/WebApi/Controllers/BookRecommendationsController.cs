namespace Cbc.WebApi.Controllers;

using AutoMapper.QueryableExtensions;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BookRecommendationsController : ApiControllerBase
{
    [HttpGet("mine")]
    public async Task<ActionResult<List<BookRecommendationDto>>> GetMyBookRecommendations()
    {
        var email = this.GetEmail();

        if (email is null)
        {
            return this.Unauthorized();
        }

        var recommendation = await this.CbcContext.BookRecommendations
            .Where(r => r.MemberEmail == email)
            .ProjectTo<BookRecommendationDto>(this.Mapper.ConfigurationProvider)
            .ToListAsync();

        return this.Ok(recommendation);
    }

    [HttpPut("/meeting/{meetingId}/book/{bookId}")]
    public async Task<ActionResult<BookRecommendationDto?>> RecommendBook(Guid bookId, Guid meetingId)
    {
        var email = this.GetEmail();

        if (email is null)
        {
            return this.Unauthorized();
        }

        var meeting = await this.CbcContext.Meetings.FindAsync(meetingId);

        if (meeting is null)
        {
            return this.NotFound($"No meeting found with Id: {meetingId}");
        }

        var book = await this.CbcContext.Books.FindAsync(bookId);

        if (book is null)
        {
            return this.NotFound($"No book found with Id: {bookId}");
        }

        var existingRecommendation = await this.CbcContext.BookRecommendations
            .FirstOrDefaultAsync(r => r.MeetingId == meetingId && r.MemberEmail == email);

        if (existingRecommendation is not null)
        {
            this.CbcContext.BookRecommendations.Remove(existingRecommendation);
        }

        var recommendation = new BookRecommendation
        {
            BookId = bookId,
            MeetingId = meetingId,
            MemberEmail = email,
        };

        this.CbcContext.BookRecommendations.Add(recommendation);

        await this.CbcContext.SaveChangesAsync();

        return this.Ok(this.Mapper.Map<BookRecommendationDto>(recommendation));
    }
}
