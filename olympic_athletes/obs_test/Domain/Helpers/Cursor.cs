﻿using System.Globalization;
using System.Text;

namespace obs_test.Domain.Helpers;

/// <summary>
///   Reads or writes cursors which are opaque strings representing a position in a list of items.
/// </summary>
public static class Cursor
{
    /// <summary>
    ///   Gets the strongly typed <typeparamref name="T" /> from the specified <paramref name="cursor" />.
    /// </summary>
    /// <typeparam name="T">The type of the cursor value.</typeparam>
    /// <param name="cursor">The cursor.</param>
    /// <returns>The cursor value.</returns>
    public static T FromCursor<T>(string cursor)
    {
        if (string.IsNullOrEmpty(cursor)) return default;

        string decodedValue;
        try
        {
            decodedValue = Base64Decode(cursor);
        }
        catch (FormatException)
        {
            return default;
        }

        var type = typeof(T);
        type = Nullable.GetUnderlyingType(type) ?? type;

        if (type == typeof(DateTimeOffset)) return (T)(object)DateTimeOffset.ParseExact(decodedValue, "o", CultureInfo.InvariantCulture);

        return (T)Convert.ChangeType(decodedValue, type, CultureInfo.InvariantCulture);
    }

    /// <summary>
    ///   Gets the cursor for the first and last item in the collection.
    /// </summary>
    /// <typeparam name="TItem">The type of the items in the collection.</typeparam>
    /// <typeparam name="TCursor">The type of the cursor value.</typeparam>
    /// <param name="enumerable">The enumerable.</param>
    /// <param name="getCursorProperty">The get cursor property.</param>
    /// <returns>The first and last cursor in the collection.</returns>
    /// <exception cref="ArgumentNullException"><paramref name="getCursorProperty" /> is <c>null</c>.</exception>
    public static (string firstCursor, string lastCursor) GetFirstAndLastCursor<TItem, TCursor>(
        IEnumerable<TItem> enumerable,
        Func<TItem, TCursor> getCursorProperty)
    {
        if (getCursorProperty is null) throw new ArgumentNullException(nameof(getCursorProperty));

        var items = enumerable.ToList();
        if (!items.Any()) return (null, null);

        var firstCursor = ToCursor(getCursorProperty(items.First()));
        var lastCursor = ToCursor(getCursorProperty(items.Last()));

        return (firstCursor, lastCursor);
    }

    /// <summary>
    ///   Gets the cursor from the strongly typed <paramref name="value" />.
    /// </summary>
    /// <typeparam name="T">The type of the cursor.</typeparam>
    /// <param name="value">The value.</param>
    /// <returns>The cursor.</returns>
    /// <exception cref="ArgumentNullException"><paramref name="value" /> is <c>null</c>.</exception>
    public static string ToCursor<T>(T value)
    {
        if (value is null) throw new ArgumentNullException(nameof(value));

        if (value is DateTimeOffset dateTimeOffset) return Base64Encode(dateTimeOffset.ToString("o", CultureInfo.InvariantCulture));

        return Base64Encode(value.ToString());
    }

    private static string Base64Decode(string value)
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(value));
    }

    private static string Base64Encode(string value)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(value));
    }
}