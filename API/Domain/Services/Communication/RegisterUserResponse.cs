namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class RegisterUserResponse : BaseResponse
    {
        private RegisterUserResponse(bool success, string message) : base(success, message)
        {
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="saveRegisterUserResource">Saved saveRegisterUserResource.</param>
        /// <returns>Response.</returns>
        public RegisterUserResponse() : this(true, string.Empty)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public RegisterUserResponse(string message) : this(false, message)
        { }
    }
}