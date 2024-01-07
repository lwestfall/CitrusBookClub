namespace Cbc.WebApi.Controllers;

using AutoMapper.QueryableExtensions;
using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Verified")]
public class BookRatingsController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<BookRatingDto>> RateBook([FromBody] BookRatingDto ratingDto)
    {
        var email = this.GetEmail();

        if (email is null)
        {
            return this.Unauthorized();
        }

        var book = await this.CbcContext.Books.FindAsync(ratingDto.BookId);

        if (book is null)
        {
            return this.NotFound($"No book found with Id: {ratingDto.BookId}");
        }

        var rating = await this.CbcContext.BookRatings.FindAsync(ratingDto.BookId, email);

        if (rating is not null)
        {
            this.CbcContext.BookRatings.Remove(rating);
        }

        var newRating = this.Mapper.Map<BookRating>(ratingDto);

        newRating.UserEmail = email;

        this.CbcContext.BookRatings.Add(newRating);

        await this.CbcContext.SaveChangesAsync();

        return this.Ok(this.Mapper.Map<BookRatingDto>(newRating));
    }

    [HttpGet("{bookId}/all")]
    public async Task<ActionResult<List<BookRatingDto>>> GetBookRatings(Guid bookId)
    {
        var book = await this.CbcContext.Books.FindAsync(bookId);

        if (book is null)
        {
            return this.NotFound($"No book found with Id: {bookId}");
        }

        var ratings = await this.CbcContext.BookRatings
            .Where(r => r.BookId == bookId)
            .ProjectTo<BookRatingDto>(this.Mapper.ConfigurationProvider)
            .ToListAsync();

        return this.Ok(ratings);
    }
}
