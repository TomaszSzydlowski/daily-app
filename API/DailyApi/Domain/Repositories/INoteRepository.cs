using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DailyApi.Domain.Models;

namespace DailyApi.Domain.Repositories
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> ListAsync(Guid userId, string date = null);
    }
}