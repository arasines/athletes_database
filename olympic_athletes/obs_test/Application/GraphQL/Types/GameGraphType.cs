using GraphQL.Types;
using obs_test.Domain.Entities;

namespace obs_test.Application.GraphQL.Types;

public sealed class GameGraphType : ObjectGraphType<Game>
{
    public GameGraphType()
    {
        Name = nameof(Game);
        Field(x => x.GameId).Description("The unique identifier of the olimpic game");
        Field(x => x.City).Description("The city hosting the game");
        Field(x => x.Year).Description("The year of the game");
    }
}