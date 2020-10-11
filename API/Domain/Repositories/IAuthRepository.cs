using System;
using System.Threading.Tasks;
using dailyApi.Domain.Models;

namespace dailyApi.Domain.Repositories
{
    public interface IAuthRepository
    {
        void Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
        Task<bool> UserExists(Guid userId);
    }
}