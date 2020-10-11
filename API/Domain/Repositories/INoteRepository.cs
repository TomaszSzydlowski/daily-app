using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Repositories
{
    public interface INoteRepository : IRepository<Note>
    {
        Task<IEnumerable<Note>> ListAsync(Guid userId);
    }
}