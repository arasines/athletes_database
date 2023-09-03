using GraphQL.Types;
using obs_test.Domain.Entities;

namespace obs_test.Application.GraphQL.Types;

public sealed class AthleteGraphType : ObjectGraphType<Athlete>
{
    public AthleteGraphType()
    {
        Name = nameof(Athlete);
        Field(x => x.AthleteId, type: typeof(IdGraphType)).Description("Id of the athlete. The unique id of the athlete");
        Field(x => x.Name).Description("The athlete given name");
        Field(x => x.Surname).Description("The athlete family name");
        Field(x => x.FullName).Description("The athlete full name");
        Field(x => x.DateOfBirth).Description("The athlete date of birth");
        Field(x => x.Height).Description("The athlete height in cm");
        Field(x => x.Weight).Description("The athlete weight in kg");
        Field(x => x.GlobalScore).Description("The global score of an athlete");
        Field(x => x.Bio).Description("A long piece of markdown formatted text with the bio of the athlete");
        Field<AthletePhotoGraphType>(nameof(Athlete.Photo)).Resolve(context => context.Source.Photo).Description("The athlete archive photo. This will always have a square size");
        Field<ListGraphType<AthleteResultGraphType>>(nameof(Athlete.AthleteResults)).Resolve(x => x.Source.AthleteResults).Description("The list of results for all the different games the athlete has participated on");
    }
}