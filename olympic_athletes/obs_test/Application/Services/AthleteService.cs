using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using obs_test.Application.GraphQL.Queries;
using obs_test.Domain.Entities;
using obs_test.Domain.Filters;
using obs_test.Domain.Models;
using obs_test.Infrastructure;

namespace obs_test.Application.Services;

public class AthleteService : IAthleteService
{
    private readonly DataContext _dbContext;
    private readonly ILogger<AthleteService> _logger;
    private readonly IMapper _mapper;


    /// <summary>
    ///   Initializes a new instance of the <see cref="AthleteService" /> class.
    /// </summary>
    /// <param name="dbContext"></param>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    public AthleteService(DataContext dbContext, IMapper mapper, ILogger<AthleteService> logger)
    {
        Guard.Against.Null(dbContext, nameof(dbContext));
        Guard.Against.Null(logger, nameof(logger));
        Guard.Against.Null(mapper, nameof(mapper));
        _dbContext = dbContext;
        _mapper = mapper;
        _logger = logger;
    }

    public Task<int> CountAsync(Filter filter, CancellationToken cancellationToken)
    {
        return _dbContext.Set<Athlete>().Where(string.IsNullOrEmpty(filter.Id), x => x.AthleteResults.Any(y => y.GameId.ToString() == filter.Id)).AsNoTracking().CountAsync(cancellationToken);
    }

    public async Task<PaginatedList<AthleteModel>> GetAllPaginated(Filter filter, CancellationToken cancellationToken)
    {
        try
        {
            var totalCount = await CountAsync(filter, cancellationToken);
            var data = await _dbContext.Set<Athlete>()
                .Include(x => x.Photo)
                .Include(x => x.AthleteResults).ThenInclude(x => x.Game)
                .Where(!string.IsNullOrEmpty(filter.Id), x => x.AthleteResults.Any(y => y.GameId.ToString() == filter.Id))
                .AsNoTracking()
                .Skip(filter.Skip)
                .Take(filter.Take)
                .ProjectTo<AthleteModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            return new PaginatedList<AthleteModel>(data, totalCount, filter.Skip, filter.Take);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            throw;
        }
    }

    public async Task<ICollection<Athlete>> GetAll(Filter filter, CancellationToken cancellationToken)
    {
        try
        {
            return await _dbContext.Set<Athlete>()
                .Include(x => x.Photo)
                .Include(x => x.AthleteResults).ThenInclude(x => x.Game)
                .Where(!string.IsNullOrEmpty(filter.Id), x => x.AthleteResults.Any(y => y.AthleteId == x.AthleteId && y.GameId.ToString() == filter.Id))
                .AsNoTracking()
                .Skip(filter.Skip)
                .Take(filter.Take)
                .ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            throw;
        }
    }

    public async Task<Athlete> FindById(string id, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _dbContext.Set<Athlete>().Include(x => x.Photo)
                .Include(x => x.AthleteResults).ThenInclude(x => x.Game).FirstOrDefaultAsync(x => x.AthleteId.Equals(id), cancellationToken);
            return result ?? new Athlete();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            throw;
        }
    }

    public async Task<AthleteModel> GetById(string id, CancellationToken cancellationToken)
    {
        try
        {
            var result = await FindById(id, cancellationToken);
            return _mapper.Map<AthleteModel>(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            throw;
        }
    }

    public async Task<ICollection<Game>> GetAllGames(CancellationToken cancellationToken)
    {
        try
        {
            return await _dbContext.Set<Game>()
                .Where(x => x.AthleteResults.Any())
                .AsNoTracking().OrderByDescending(x => x.Year).ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            throw;
        }
    }
}