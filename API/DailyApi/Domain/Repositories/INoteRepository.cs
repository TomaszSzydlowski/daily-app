using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApp.Requests.Filters;

namespace DailyApi.Domain.Repositories
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> ListAsync(Guid userId, GetAllNotesFilters filters = null);
    }
}