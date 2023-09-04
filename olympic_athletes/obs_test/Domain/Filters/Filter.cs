namespace obs_test.Domain.Filters;

public class Filter
{
    private int _take;

    /// <summary>
    ///   The take method for pagination
    /// </summary>
    public int Take
    {
        get => _take == 0 ? 20 : _take;
        set => _take = value;
    }

    /// <summary>
    ///   The skip methos for pagination
    /// </summary>
    public int Skip { get; set; }

    public string Id { get; set; } = string.Empty;
}