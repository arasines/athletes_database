namespace obs_test.Domain.Entities;

public class Game
{
    public long GameId { get; set; }

    public string City { get; set; } = null!;

    public long Year { get; set; }

    public virtual ICollection<AthleteResult> AthleteResults { get; set; } = new List<AthleteResult>();
}