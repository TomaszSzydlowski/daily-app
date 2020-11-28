using System.Collections.Generic;
using DailyApi.Domain.Repositories;
using DailyApi.Domain.Models;
using DailyApi.Persistence.Repositories;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;
using DailyApi.Requests.Filters;
using System.Linq;

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
            var filter = new List<FilterDefinition<Note>>
            {
                Builders<Note>.Filter.Eq(n=>n.UserId,userId)
            };

            if (!string.IsNullOrEmpty(filters?.Date))
            {
                var startDateFilter = DateTime.Parse(filters.Date);
                var endDateFilter = startDateFilter.AddDays(1);

                filter.Add(Builders<Note>.Filter.Gte(n => n.Date, startDateFilter));
                filter.Add(Builders<Note>.Filter.Lte(n => n.Date, endDateFilter));
            }

            var rootFilter = Builders<Note>.Filter.And(filter);
            var result=DbSet.Find(rootFilter).SortByDescending(n=>n.Date);
            return await result.ToListAsync();
        }

        public string[] GetNotesDates(Guid userId)
        {
            ConfigDbSet();
            return DbSet.AsQueryable()
                        .Where(n => n.UserId == userId)
                        .OrderByDescending(n => n.Date)
                        .Select(n => n.Date)
                        .ToArray()
                        .Select(d => d.ToString("yyyy-MM-dd"))
                        .Distinct()
                        .ToArray();
        }
    }
}
