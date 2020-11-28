using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Requests.Filters;

namespace DailyApi.Domain.Repositories
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> ListAsync(Guid userId, GetNotesFilters filters = null);
        Task<string[]> GetNotesDates(Guid userId);
    }
}