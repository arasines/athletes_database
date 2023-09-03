using Dapper;
using obs_test.Domain.Entities;

namespace obs_test.Infrastructure.Repositories;

public class AthleteRepository: IAthleteRepository{

    private readonly IDataContext _context;

    public AthleteRepository(IDataContext dataContext)
    {
        _context = dataContext;
    }
    public async Task<IEnumerable<Athlete>> GetAll()
    {
        using var connection = _context.CreateConnection();
        const string sql = "SELECT * FROM Athlete";
        return await connection.QueryAsync<Athlete>(sql);
    }
    public async Task<Athlete> GetById(string id)
    {
        using var connection = _context.CreateConnection();
        const string sql = """
                               SELECT * FROM Athlete
                               WHERE Id = @id
                           """;
        return await connection.QuerySingleOrDefaultAsync<Athlete>(sql, new { id });
    }
}