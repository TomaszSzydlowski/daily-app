using System.Threading.Tasks;
using DailyApi.Commands.AuthCommands;
using DailyApi.Domain.Services.Communication;
using DailyApi.Resources;

namespace DailyApi.Domain.Services
{
    public interface IAuthService
    {
        Task<RegisterUserResponse> Register(CreateUserRegisterCommand createUserRegisterCommand);
        Task<LoginUserResponse> Login(LoginUserCommand loginUserResource);
    }
}