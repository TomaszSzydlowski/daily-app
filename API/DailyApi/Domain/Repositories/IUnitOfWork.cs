using System;
using System.Threading.Tasks;

namespace DailyApi.Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> Commit();
    }
}
