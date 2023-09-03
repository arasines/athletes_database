namespace obs_test.Domain.Models;

/// <summary>
///   The Paginated List
/// </summary>
/// <typeparam name="T"></typeparam>
public class PaginatedList<T>
{
    /// <summary>
    ///   Initializes a new instance of the <see cref="PaginatedList{T}" /> class.
    /// </summary>
    public PaginatedList()
    {
        Skip = 0;
        Take = 20;
        Value = new List<T>();
        Errors = new List<string>();
    }

    /// <summary>
    ///   Initializes a new instance of the <see cref="PaginatedList{T}" /> class.
    /// </summary>
    /// <param name="items"></param>
    /// <param name="count"></param>
    /// <param name="skip"></param>
    /// <param name="take"></param>
    public PaginatedList(IEnumerable<T> items, int count, int skip, int take) : this()
    {
        Skip = skip;
        Take = take;
        Count = count;
        TotalPages = (int)Math.Ceiling(count / (double)take);
        Value = new List<T>();
        Value.AddRange(items);
    }

    /// <summary>
    ///   Gets or sets the current page
    /// </summary>
    public int Skip { get; }

    /// <summary>
    ///   Gets or sets the page size
    /// </summary>
    public int Take { get; }

    /// <summary>
    ///   Gets the total number of elements on the page
    /// </summary>
    public int Count { get; }

    /// <summary>
    ///   Gets the total number of pages
    /// </summary>
    public int TotalPages { get; }

    /// <summary>
    ///   Gets or sets the list of elements
    /// </summary>
    public List<T> Value { get; set; }

    /// <summary>
    ///   Gets or sets the list of errors if any
    /// </summary>
    public List<string> Errors { get; set; }

    /// <summary>
    ///   True if HasPreviousPage
    /// </summary>
    public bool HasPreviousPage => Skip > 1;

    /// <summary>
    ///   True if the list HasNextPage
    /// </summary>
    public bool HasNextPage => Skip + Take < Count;
}