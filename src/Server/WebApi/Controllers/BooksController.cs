namespace Cbc.WebApi.Controllers;

using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize(Roles = "Verified")]
public class BooksController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<BookAnonymousDto>>> GetBooks()
    {
        var books = await this.CbcContext.Books.ToListAsync();
        return this.Ok(this.Mapper.Map<List<BookAnonymousDto>>(books));
    }

    [HttpGet("others")]
    public async Task<ActionResult<List<BookAnonymousDto>>> GetOthersBooks()
    {
        var email = this.GetEmail();

        var books = await this.CbcContext.Books
            .Where(x => x.UserEmail != email)
            .ToListAsync();

        return this.Ok(this.Mapper.Map<List<BookAnonymousDto>>(books));
    }

    [HttpGet("mine")]
    public async Task<ActionResult<List<BookDto>>> GetUsersBooks()
    {
        var email = this.GetEmail();

        if (email is null)
        {
            return this.Unauthorized();
        }

        var user = await this.CbcContext.Users
            .Include(u => u.Books)
            .FirstOrDefaultAsync(u => u.EmailAddress == this.GetEmail());

        if (user == null)
        {
            return this.NotFound();
        }

        return this.Ok(this.Mapper.Map<List<BookDto>>(user.Books));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBook(Guid id)
    {
        var book = await this.CbcContext.Books.FindAsync(id);
        if (book == null)
        {
            return this.NotFound();
        }

        return this.Ok(this.Mapper.Map<BookDto>(book));
    }

    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook([FromBody] CreateBookDto createBookDto)
    {
        var book = this.Mapper.Map<Book>(createBookDto);
        var email = this.GetEmail();

        if (email is null)
        {
            return this.Unauthorized();
        }

        book.User = await this.CbcContext.Users
            .FirstOrDefaultAsync(u => u.EmailAddress == email);

        this.CbcContext.Books.Add(book);
        await this.CbcContext.SaveChangesAsync();
        return this.CreatedAtAction(nameof(GetBook), new { id = book.Id }, this.Mapper.Map<BookDto>(book));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(Guid id)
    {
        var book = await this.CbcContext.Books.FindAsync(id);
        if (book == null)
        {
            return this.NotFound();
        }

        var email = this.GetEmail();

        if (book.UserEmail != email && !this.User.IsInRole("Admin"))
        {
            return this.Unauthorized();
        }

        this.CbcContext.Books.Remove(book);
        await this.CbcContext.SaveChangesAsync();
        return this.NoContent();
    }
}
