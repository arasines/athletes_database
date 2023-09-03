using GraphQL.Builders;
using System.Linq.Expressions;

namespace obs_test.Application.GraphQL.Queries;

public static class GraphQlExtensions
{
    /// <summary>
    /// Where for IQueryable
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="source"></param>
    /// <param name="shouldToFilter"></param>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public static IQueryable<T> Where<T>(this IQueryable<T> source, bool shouldToFilter, Expression<Func<T, bool>> predicate) => shouldToFilter ? source.Where(predicate) : source;

    /// <summary>
    /// Where for IQueryable
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="source"></param>
    /// <param name="shouldToFilter"></param>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public static IEnumerable<T> Where<T>(this IEnumerable<T> source, bool shouldToFilter, Func<T, bool> predicate) => shouldToFilter ? source.Where(predicate) : source;

    /// <summary>
    ///   Gets the page size
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static int GetTake(this IResolveConnectionContext<object> context)
    {
        return context.First.GetValueOrDefault(1);
    }

    /// <summary>
    ///   Get the page
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static int GetSkip(this IResolveConnectionContext<object> context)
    {
        return string.IsNullOrEmpty(context.After) || context.After == "0" ? 0 : int.Parse(context.After);
    }
}