using System;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace DailyApi.Domain.Repositories
{
    public interface IAppDbContext : IDisposable
    {
        void AddCommand(Func<Task> func);
        Task<int> SaveChanges();
        IMongoCollection<T> GetCollection<T>(string name);
    }
}