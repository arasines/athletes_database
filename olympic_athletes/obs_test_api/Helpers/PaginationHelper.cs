using System.Text.Json;
using obs_test.Domain.Models;

namespace obst_test_api.Helpers;

public static class PaginationHelper
{
    public static void AddPagination<T>(this HttpResponse response, PaginatedList<T> collection)
    {
        var metadata = new
        {
            collection.Count,
            collection.Skip,
            collection.Take,
            collection.TotalPages,
            collection.HasNextPage,
            collection.HasPreviousPage
        };

        response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));
    }
}