namespace Cbc.WebApi.Helpers;

using Cbc.WebApi.Dtos;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class AdditionalSchemaDefinitionsDocumentFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        // add types to this list to expose them in the swagger doc when they aren't used in any controllers
        var types = new[] { typeof(CreateBookVoteDto) };

        foreach (var type in types)
        {
            context.SchemaGenerator.GenerateSchema(type, context.SchemaRepository);
        }
    }
}
