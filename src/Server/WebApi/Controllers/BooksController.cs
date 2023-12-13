namespace Cbc.WebApi.Controllers;

using Cbc.WebApi.Dtos;
using Cbc.WebApi.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Verified")]
public class BooksController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<BookDto>>> GetBooks()
    {
        var books = await this.CbcContext.Books.ToListAsync();
        return this.Ok(this.Mapper.Map<List<BookDto>>(books));
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
    public async Task<ActionResult<BookDto>> CreateBook(CreateBookDto createBookDto)
    {
        var book = this.Mapper.Map<Book>(createBookDto);
        this.CbcContext.Books.Add(book);
        await this.CbcContext.SaveChangesAsync();
        return this.CreatedAtAction(nameof(GetBook), new { id = book.Id }, this.Mapper.Map<BookDto>(book));
    }
}
