using AutoMapper;
using netCoreMongoDbApi.Resources;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Extensions;

namespace Supermarket.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Student, StudentResource>()
            .ForMember(src => src.Semester,
            opt => opt.MapFrom(src => src.Semester.ToDescriptionString()));
        }
    }
}