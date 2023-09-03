using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using obs_test.Application.GraphQL.Queries;

namespace obs_test.Application.GraphQL;

public class GraphSchema : Schema
{
    /// <summary>
    ///   Initializes a new instance of the <see cref="GraphSchema" /> class.
    /// </summary>
    /// <param name="provider">The .Net Standard <see cref="IServiceProvider" /> interface </param>
    public GraphSchema(IServiceProvider provider)
        : base(provider)
    {
        Query = provider.GetRequiredService<RootQuery>();
    }
}