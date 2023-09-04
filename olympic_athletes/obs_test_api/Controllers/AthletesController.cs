using Ardalis.GuardClauses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using obs_test.Application.UseCases.Queries;
using obs_test.Domain.Entities;
using obs_test.Domain.Filters;
using obs_test.Domain.Models;
using obst_test_api.Helpers;

namespace obst_test_api.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Produces("application/json")]
[Route("api/[controller]")]
public class AthletesController : ControllerBase
{
    private readonly ILogger<AthletesController> _logger;
    private readonly IMediator _mediator;

    /// <summary>
    ///   Initializes a new instance of the &lt;see cref="AthletesController" /&gt; class.
    /// </summary>
    /// <param name="logger"></param>
    /// <param name="mediator"></param>
    public AthletesController(ILogger<AthletesController> logger, IMediator mediator)
    {
        Guard.Against.Null(mediator, nameof(mediator));
        Guard.Against.Null(logger, nameof(logger));
        _logger = logger;
        _mediator = mediator;
    }

    /// <summary>
    ///   Gets the available Athletes based on the filter
    /// </summary>
    /// <param name="filter">The Athlete filter</param>
    /// <response code="200">List of athletes</response>
    /// <response code="404">Athlete has missing/invalid values</response>
    /// <response code="500">Oops! Can't get the athletes right now</response>
    [HttpGet(Name = "GetAthletes")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedList<AthleteModel>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Get([FromQuery] Filter filter)
    {
        try
        {
            var result = await _mediator.Send(new AthleteQuery(filter));
            if (!result.Value.Any()) return NotFound();
            Response.AddPagination(result);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    /// <summary>
    ///   Gets a specific Athlete by its unique id
    /// </summary>
    /// <param name="id" example="123">The Athlete unique id</param>
    /// <response code="200">Here is the Athlete requested</response>
    /// <response code="400">Athlete has missing/invalid values</response>
    /// <response code="404">The Athlete cannot be found</response>
    /// <response code="500">Oops! Can't get the Athlete right now</response>
    [HttpGet("{id}", Name = "GetAthleteById")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AthleteModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<Athlete>> GetById(string id)
    {
        try
        {
            var result = await _mediator.Send(new AthleteByIdQuery(id));
            if (result == null) return NotFound();
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error: {Message}", ex.Message);
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}