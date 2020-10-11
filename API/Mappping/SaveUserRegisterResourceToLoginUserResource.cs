using AutoMapper;
using netCoreMongoDbApi.Resources;

namespace netCoreMongoDbApi.Mapping
{
    public class SaveUserRegisterResourceToLoginUserResource : Profile
    {
        public SaveUserRegisterResourceToLoginUserResource()
        {
            CreateMap<SaveUserRegisterResource, LoginUserResource>();
        }
    }
}