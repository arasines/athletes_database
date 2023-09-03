namespace obs_test.Domain.Entities;

public class AthletePhoto
{
    public long PhotoId { get; set; }

    public string MimeType { get; set; } = null!;

    public byte[] Blob { get; set; } = null!;

    public virtual Athlete? Athlete { get; set; }
}