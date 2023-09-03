namespace obs_test.Domain.Models;

public class AthleteModel
{
    public string Id { get; set; } = "";

    public string FullName { get; set; } = "";

    public string DateOfBirth { get; set; } = "";

    public string Bio { get; set; } = "";

    public long Height { get; set; }

    public long Weight { get; set; }
    public virtual ICollection<AthleteResultModel> AthleteResults { get; set; } = new List<AthleteResultModel>();
    public AthletePhotoModel Photo { get; set; } = null!;
}