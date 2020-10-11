using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Persistence.Repositories;

namespace netCoreMongoDbApi.Persistence.Repository
{
    public class NoteRepository : BaseRepository<Note>, INoteRepository
    {
        public NoteRepository( IAppDbContext context ) : base(context)
        {

        }
    }
}