using AutoMapper;
using dailyApi.Resources;

namespace dailyApi.Mapping
{
    public class SaveUserRegisterResourceToLoginUserResource : Profile
    {
        public SaveUserRegisterResourceToLoginUserResource()
        {
            CreateMap<SaveUserRegisterResource, LoginUserResource>();
        }
    }
}