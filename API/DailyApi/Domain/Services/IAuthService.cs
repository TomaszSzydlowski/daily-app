using System.Threading.Tasks;
using DailyApi.Domain.Services.Communication;
using DailyApi.Resources;

namespace DailyApi.Domain.Services
{
    public interface IAuthService
    {
        Task<RegisterUserResponse> Register(SaveUserRegisterResource saveRegisterUserResource);
        Task<LoginUserResponse> Login(LoginUserResource loginUserResource);
    }
}