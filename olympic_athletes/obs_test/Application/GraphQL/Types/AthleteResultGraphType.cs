using GraphQL.Types;
using obs_test.Domain.Entities;

namespace obs_test.Application.GraphQL.Types;

public sealed class AthleteResultGraphType : ObjectGraphType<AthleteResult>
{
    public AthleteResultGraphType()
    {
        Name = nameof(AthleteResult);
        Field<GameGraphType>(nameof(AthleteResult.Game)).Resolve(context => context.Source.Game);
        Field(x => x.Gold).Description("Number of gold medals won");
        Field(x => x.Silver).Description("Number of silver medals won");
        Field(x => x.Bronze).Description("Number of bronce medals won");
    }
}