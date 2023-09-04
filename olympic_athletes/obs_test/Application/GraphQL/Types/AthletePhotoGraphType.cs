using GraphQL.Types;
using obs_test.Domain.Entities;

namespace obs_test.Application.GraphQL.Types;

public sealed class AthletePhotoGraphType : ObjectGraphType<AthletePhoto>
{
    public AthletePhotoGraphType()
    {
        Name = nameof(AthletePhoto);
        Field(x => x.Blob).Description("The athlete archive photo. This will always have a square size");
        Field(x => x.Photo).Description("The athlete archive photo in base64. This will always have a square size");
        Field(x => x.Thumbnail).Description("The athlete archive photo thumbnail. This will always have a square size");
        Field(x => x.MimeType).Description("The mime type of the photo");
    }
}