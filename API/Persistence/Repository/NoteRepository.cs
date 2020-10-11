using System.Collections.Generic;
using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Persistence.Repositories;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;

namespace netCoreMongoDbApi.Persistence.Repository
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