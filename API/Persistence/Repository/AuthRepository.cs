using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Persistence.Contexts;

namespace netCoreMongoDbApi.Persistence.Repositories
{
    public class AuthRepository : BaseRepository<User>, IAuthRepository
    {
        public AuthRepository(IAppDbContext context) : base(context)
        {
        }

        public async Task<User> Login(string email, string password)
        {
            var user = await GetByPropertyName("Email", email);
            if (user == null)
                return null; // User does not exist.

            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false; // if mismatch
                }
            }
            return true; //if no mismatches.
        }

        public void Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            Add(user);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            var user = await GetByPropertyName("email", email);
            if (user != null)
                return true;
            return false;
        }

        public async Task<bool> UserExists(Guid userId)
        {
            var user = await GetById(userId);

            if (user != null)
                return true;
            return false;
        }
    }
}