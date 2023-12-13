namespace Cbc.WebApi.Controllers;
using AutoMapper;
using Cbc.WebApi.Data;
using Microsoft.AspNetCore.Mvc;

public abstract class ApiControllerBase : ControllerBase
{
    protected CbcDbContext CbcContext
        => this.HttpContext.RequestServices.GetRequiredService<CbcDbContext>();

    protected IMapper Mapper
        => this.HttpContext.RequestServices.GetRequiredService<IMapper>();
}
