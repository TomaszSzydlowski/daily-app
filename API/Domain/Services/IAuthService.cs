using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Services.Communication;
using netCoreMongoDbApi.Resources;

namespace netCoreMongoDbApi.Domain.Services
{
    public interface IAuthService
    {
        Task<RegisterUserResponse> Register(SaveUserRegisterResource saveRegisterUserResource);
        Task<LoginUserResponse> Login(LoginUserResource loginUserResource);
    }
}