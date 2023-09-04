using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq.Expressions;
using GraphQL.Builders;
using static System.Net.Mime.MediaTypeNames;
using Image = System.Drawing.Image;

namespace obs_test.Application.GraphQL.Queries;

public static class GraphQlExtensions
{
    /// <summary>
    ///   Where for IQueryable
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="source"></param>
    /// <param name="shouldToFilter"></param>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public static IQueryable<T> Where<T>(this IQueryable<T> source, bool shouldToFilter, Expression<Func<T, bool>> predicate)
    {
        return shouldToFilter ? source.Where(predicate) : source;
    }

    /// <summary>
    ///   Where for IQueryable
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="source"></param>
    /// <param name="shouldToFilter"></param>
    /// <param name="predicate"></param>
    /// <returns></returns>
    public static IEnumerable<T> Where<T>(this IEnumerable<T> source, bool shouldToFilter, Func<T, bool> predicate)
    {
        return shouldToFilter ? source.Where(predicate) : source;
    }

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
    public static byte[] MakeThumbnail(this byte[] myImage, int thumbWidth, int thumbHeight)
    {
        using var ms = new MemoryStream();
        using var thumbnail = Image.FromStream(new MemoryStream(myImage)).GetThumbnailImage(thumbWidth, thumbHeight, null, new IntPtr());
        thumbnail.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
        return ms.ToArray();
    }
}