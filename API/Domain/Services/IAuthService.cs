using System.Threading.Tasks;
using dailyApi.Domain.Services.Communication;
using dailyApi.Resources;

namespace dailyApi.Domain.Services
{
    public interface IAuthService
    {
        Task<RegisterUserResponse> Register(SaveUserRegisterResource saveRegisterUserResource);
        Task<LoginUserResponse> Login(LoginUserResource loginUserResource);
    }
}