using DailyApi.Domain.Models;

namespace DailyApi.Domain.Services.Communication
{
    public class LoginUserResponse : BaseResponse
    {

        public User User { get; private set; }
        public string Token { get; private set; }

        private LoginUserResponse(bool success, string message, User user, string token) : base(success, message)
        {
            User = user;
            Token = token;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="token">Saved tokenString.</param>
        /// <param name="user">Saved user.</param>
        /// <returns>Response.</returns>
        public LoginUserResponse(User user, string token) : this(true, string.Empty, user, token)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public LoginUserResponse(string message) : this(false, message, null, null)
        { }
    }
}