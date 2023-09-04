using obs_test.Application.GraphQL.Queries;

namespace obs_test.Domain.Entities;

public class AthletePhoto
{
    public long PhotoId { get; set; }

    public string MimeType { get; set; } = null!;

    public byte[] Blob { get; set; } = null!;
    public string Photo => Convert.ToBase64String(Blob);
    public string Thumbnail => Convert.ToBase64String(Blob.MakeThumbnail(100, 100));

    public virtual Athlete? Athlete { get; set; }
}