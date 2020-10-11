using System.Threading.Tasks;
using dailyApi.Domain.Repositories;

namespace dailyApi.Persistence.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IAppDbContext _context;
        public UnitOfWork(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Commit()
        {
            var changeAmount = await _context.SaveChanges();

            return changeAmount > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}