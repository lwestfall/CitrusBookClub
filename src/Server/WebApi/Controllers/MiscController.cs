namespace Cbc.WebApi.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/")]
[Authorize(Roles = "Verified")]
public class MiscController : ApiControllerBase
{
    [HttpGet("GoogleApiKey")]
    public ActionResult<string?> GoogleApiKey()
    {
        var googleBooksApiKey = this.Configuration["GOOGLE_API_KEY"];

        if (string.IsNullOrWhiteSpace(googleBooksApiKey))
        {
            return this.NotFound();
        }

        return this.Ok(googleBooksApiKey);
    }
}
