using System.Collections.Generic;
using DailyApi.Domain.Repositories;
using DailyApi.Domain.Models;
using DailyApi.Persistence.Repositories;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;
using DailyApi.Requests.Filters;

namespace DailyApi.Persistence.Repositories
{
    public class NoteRepository : BaseRepository<Note>, INoteRepository
    {
        protected override string _collectionName { get { return "notes"; } }

        public NoteRepository(IAppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Note>> ListAsync(Guid userId, GetNotesFilters filters = null)
        {
            ConfigDbSet();
            IAsyncCursor<Note> filteredNotes;
            var filterBuilder = Builders<Note>.Filter;
            if (!string.IsNullOrEmpty(filters?.Date))
            {
                var startDateFilter = DateTime.Parse(filters.Date);
                var endDateFilter = startDateFilter.AddDays(1);
                filteredNotes = await DbSet.FindAsync(
                    filterBuilder.Eq(x => x.UserId, userId) &
                    filterBuilder.Gte(x => x.Date, startDateFilter) &
                    filterBuilder.Lte(x => x.Date, endDateFilter));
            }
            else
            {
                filteredNotes = await DbSet.FindAsync(filterBuilder.Eq(x => x.UserId, userId));
            }
            return filteredNotes.ToList();
        }
    }
}
