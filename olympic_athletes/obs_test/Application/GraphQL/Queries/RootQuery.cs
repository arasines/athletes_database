using GraphQL;
using GraphQL.MicrosoftDI;
using GraphQL.Types;
using GraphQL.Types.Relay.DataObjects;
using Microsoft.Extensions.DependencyInjection;
using obs_test.Application.GraphQL.Types;
using obs_test.Application.Services;
using obs_test.Domain.Entities;
using obs_test.Domain.Filters;
using obs_test.Domain.Helpers;

namespace obs_test.Application.GraphQL.Queries;

public sealed class RootQuery : ObjectGraphType
{
    private const int DefaultMaxPageSize = 100;

    /// <summary>
    ///   Initializes a new instance of the <see cref="RootQuery" /> class.
    /// </summary>
    public RootQuery()
    {
        Name = "RootQuery";
        Field<AthleteGraphType, Athlete>("athlete")
            .Argument<NonNullGraphType<IdGraphType>>("id", "The unique id of the athlete")
            .Description("Gets a specific Athlete by its unique id")
            .Resolve()
            .WithScope()
            .WithService<IAthleteService>()
            .ResolveAsync((context, service) => service.FindById(context.GetArgument<string>("id"), context.CancellationToken));

        Connection<AthleteGraphType>()
            .Name("athletes")
            .Description("Gets the available Athletes based on the filter")
            .Argument<IdGraphType>("id", "the unique identifier of the game")
            .PageSize(DefaultMaxPageSize)
            .ResolveScopedAsync(async context =>
            {
                try
                {
                    var filter = new Filter
                    {
                        Id = context.GetArgument<string>("id"),
                        Take = context.GetTake(),
                        Skip = context.GetSkip()
                    };
                    var repository = context.RequestServices.GetRequiredService<IAthleteService>();
                    var data = await repository.GetAll(filter, context.CancellationToken);
                    var totalCount = await repository.CountAsync(filter, context.CancellationToken);
                    var (firstCursor, lastCursor) = Cursor.GetFirstAndLastCursor(data, x => x.AthleteId);
                    return new Connection<Athlete>
                    {
                        Edges = data.Select(x => new Edge<Athlete> { Cursor = Cursor.ToCursor(x.AthleteId), Node = x }).ToList(),
                        PageInfo = new PageInfo { HasNextPage = filter.Skip + filter.Take < totalCount, HasPreviousPage = filter.Skip > 0, StartCursor = firstCursor, EndCursor = lastCursor },
                        TotalCount = totalCount
                    };
                }
                catch (Exception ex)
                {
                    context.Errors.Add(new ExecutionError(ex.Message));
                    return null;
                }
            });

        Field<ListGraphType<GameGraphType>, ICollection<Game>>("games")
            .Description("Gets the available games ordered descending by year")
            .Resolve()
            .WithScope()
            .WithService<IAthleteService>()
            .ResolveAsync((context, service) => service.GetAllGames(context.CancellationToken));
    }
}