using AutoMapper;
using DailyApi.Commands.AuthCommands;
using DailyApi.Resources;

namespace DailyApi.Mapping
{
    public class SaveUserRegisterResourceToLoginUserResource : Profile
    {
        public SaveUserRegisterResourceToLoginUserResource()
        {
            CreateMap<CreateUserRegisterCommand, LoginUserCommand>();
        }
    }
}