using Ardalis.GuardClauses;
using MediatR;
using obs_test.Application.Services;
using obs_test.Domain.Models;

namespace obs_test.Application.UseCases.Queries;

public class AthleteByIdQuery : IRequest<AthleteModel>
{
    public AthleteByIdQuery(string id)
    {
        Id = id;
    }

    public string Id { get; set; }
}

public class AthleteByIdQueryHandler : IRequestHandler<AthleteByIdQuery, AthleteModel>
{
    private readonly IAthleteService _athleteService;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AthleteByIdQueryHandler" /> class.
    /// </summary>
    /// <param name="athleteService">The repository</param>
    public AthleteByIdQueryHandler(IAthleteService athleteService)
    {
        Guard.Against.Null(athleteService, nameof(athleteService));
        _athleteService = athleteService;
    }

    public Task<AthleteModel> Handle(AthleteByIdQuery request, CancellationToken cancellationToken)
    {
        return _athleteService.GetById(request.Id, cancellationToken);
    }
}