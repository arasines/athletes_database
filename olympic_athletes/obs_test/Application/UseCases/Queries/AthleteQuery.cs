using Ardalis.GuardClauses;
using MediatR;
using obs_test.Application.Services;
using obs_test.Domain.Filters;
using obs_test.Domain.Models;

namespace obs_test.Application.UseCases.Queries;

public class AthleteQuery : IRequest<PaginatedList<AthleteModel>>
{
    public AthleteQuery()
    {
        Filter = new Filter();
    }

    public AthleteQuery(Filter filter) : this()
    {
        Filter = filter;
    }

    public Filter Filter { get; set; }
}

public class AthleteQueryHandler : IRequestHandler<AthleteQuery, PaginatedList<AthleteModel>>
{
    private readonly IAthleteService _athleteService;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AthleteQueryHandler" /> class.
    /// </summary>
    /// <param name="athleteService">The repository</param>
    public AthleteQueryHandler(IAthleteService athleteService)
    {
        Guard.Against.Null(athleteService, nameof(athleteService));
        _athleteService = athleteService;
    }

    public Task<PaginatedList<AthleteModel>> Handle(AthleteQuery request, CancellationToken cancellationToken)
    {
        return _athleteService.GetAllPaginated(request.Filter, cancellationToken);
    }
}