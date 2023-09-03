using System.Reflection;
using GraphQL;
using GraphQL.Execution;
using GraphQL.MicrosoftDI;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using obs_test.Application.GraphQL;
using obs_test.Application.Services;
using obs_test.Infrastructure;

namespace obs_test;

public static class DependencyInyection
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        return services
            .AddDbContext<DataContext>(options => options.UseSqlite(configuration.GetConnectionString("DefaultConnection")))
            .AddScoped<IAthleteService, AthleteService>()
            .AddCustomGraphQl(environment)
            .AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies())
            .AddMediatR(e => e.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
    }

    /// <summary>
    ///   Configures GraphQl
    /// </summary>
    /// <param name="services">The collection of services to configure the application</param>
    /// <param name="environment"></param>
    private static IServiceCollection AddCustomGraphQl(this IServiceCollection services, IHostEnvironment environment)
    {
        services.AddSingleton<ISchema, GraphSchema>(e => new GraphSchema(new SelfActivatingServiceProvider(e)));
        services.AddGraphQL(builder => builder
            .UseApolloTracing()
            .AddSchema<GraphSchema>()
            .ConfigureExecutionOptions(options =>
            {
                options.EnableMetrics = environment.IsDevelopment();
                options.ThrowOnUnhandledException = false;
            })
            .AddSystemTextJson()
            .AddErrorInfoProvider(e =>
            {
                e.ExposeExceptionDetails = environment.IsDevelopment();
                e.ExposeData = environment.IsDevelopment();
                e.ExposeExceptionDetailsMode = ExposeExceptionDetailsMode.Message;
            })
            .AddGraphTypes());

        return services;
    }

    private static IApplicationBuilder UseCustomGraphQlUi(this IApplicationBuilder app)
    {
        return app
            .UseGraphQLPlayground("/ui/playground", new PlaygroundOptions
            {
                BetaUpdates = true,
                HideTracingResponse = false,
                EditorCursorShape = EditorCursorShape.Line,
                EditorTheme = EditorTheme.Light,
                EditorFontSize = 14,
                EditorReuseHeaders = true,
                EditorFontFamily = "Consolas",
                PrettierPrintWidth = 80,
                PrettierTabWidth = 2,
                PrettierUseTabs = true,
                SchemaDisableComments = false,
                SchemaPollingEnabled = true,
                SchemaPollingEndpointFilter = "*localhost*",
                SchemaPollingInterval = 5000,
                Headers = new Dictionary<string, object>
                {
                    ["Authorization"] = ""
                }
            });
    }

    /// <summary>
    ///   Use GraphQL +  GraphQL Playground library which is cool to explore the data with GrapQL. It’s similar to Swagger.
    /// </summary>
    /// <param name="app"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseCustomGraphQl<TSchema>(this IApplicationBuilder app) where TSchema : ISchema
    {
        // Use the GraphQL subscriptions in the specified schema and make them available at /graphql.
        return app
            .UseGraphQL<TSchema>()
            .UseCustomGraphQlUi();
    }
}