namespace obs_test.Domain.Entities;

public class Athlete
{
    public string AthleteId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string DateOfBirth { get; set; } = null!;

    public string Bio { get; set; } = null!;

    public long Height { get; set; }

    public long Weight { get; set; }
    
    public long PhotoId { get; set; }

    public virtual ICollection<AthleteResult> AthleteResults { get; set; } = new List<AthleteResult>();

    public virtual AthletePhoto Photo { get; set; } = null!;
    public string FullName  => $"{Name} {Surname}";
    public long GlobalScore => AthleteResults.Any() ? AthleteResults.Sum(x => x.Gold) * 5 + AthleteResults.Sum(x => x.Silver) * 3 + AthleteResults.Sum(x => x.Bronze) * 1 : 0;
}