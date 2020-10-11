using System;
using System.Threading.Tasks;

namespace dailyApi.Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> Commit();
    }
}
