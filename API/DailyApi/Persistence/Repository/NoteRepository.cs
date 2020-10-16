using System.Collections.Generic;
using DailyApi.Domain.Repositories;
using DailyApi.Domain.Models;
using DailyApi.Persistence.Repositories;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;

namespace DailyApi.Persistence.Repository
{
    public class NoteRepository : BaseRepository<Note>, INoteRepository
    {
        protected override string _collectionName { get { return "notes"; } }

        public NoteRepository(IAppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Note>> ListAsync(Guid userId)
        {
            ConfigDbSet();
            var all = await DbSet.FindAsync(Builders<Note>.Filter.Eq(x => x.UserId, userId));
            return all.ToList();
        }
    }
}