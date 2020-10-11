using AutoMapper;
using DailyApi.Resources;

namespace DailyApi.Mapping
{
    public class SaveUserRegisterResourceToLoginUserResource : Profile
    {
        public SaveUserRegisterResourceToLoginUserResource()
        {
            CreateMap<SaveUserRegisterResource, LoginUserResource>();
        }
    }
}