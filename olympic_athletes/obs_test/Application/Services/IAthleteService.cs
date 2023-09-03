using obs_test.Domain.Entities;
using obs_test.Domain.Filters;
using obs_test.Domain.Models;

namespace obs_test.Application.Services;

public interface IAthleteService
{
    Task<int> CountAsync(Filter filter, CancellationToken cancellationToken);
    Task<ICollection<Athlete>> GetAll(Filter filter, CancellationToken cancellationToken);
    Task<PaginatedList<AthleteModel>> GetAllPaginated(Filter filter, CancellationToken cancellationToken);
    Task<AthleteModel> GetById(string id, CancellationToken cancellationToken);
    Task<Athlete> FindById(string id, CancellationToken cancellationToken);
    Task<ICollection<Game>> GetAllGames(CancellationToken cancellationToken);
}