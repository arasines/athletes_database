namespace obs_test.Domain.Entities;

public class AthleteResult
{
    public string AthleteId { get; set; } = null!;

    public long GameId { get; set; }

    public long Gold { get; set; }

    public long Silver { get; set; }

    public long Bronze { get; set; }

    public virtual Athlete Athlete { get; set; } = null!;

    public virtual Game Game { get; set; } = null!;
}