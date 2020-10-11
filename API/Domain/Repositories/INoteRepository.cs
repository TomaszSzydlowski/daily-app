using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dailyApi.Domain.Models;

namespace dailyApi.Domain.Repositories
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> ListAsync(Guid userId);
    }
}