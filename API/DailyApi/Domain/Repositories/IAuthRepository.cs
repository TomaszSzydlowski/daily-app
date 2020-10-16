using System;
using System.Threading.Tasks;
using DailyApi.Domain.Models;

namespace DailyApi.Domain.Repositories
{
    public interface IAuthRepository
    {
        void Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
        Task<bool> UserExists(Guid userId);
    }
}