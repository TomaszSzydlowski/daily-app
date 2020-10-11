using System;
using System.Threading.Tasks;

namespace netCoreMongoDbApi.Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> Commit();
    }
}
