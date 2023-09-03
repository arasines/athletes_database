using obs_test.Domain.Entities;

namespace obs_test.Infrastructure.Repositories;

public interface IAthleteRepository
{
    Task<IEnumerable<Athlete>> GetAll();
    Task<Athlete> GetById(string id);
}