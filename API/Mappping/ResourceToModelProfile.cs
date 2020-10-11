using AutoMapper;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Resources;

namespace netCoreMongoDbApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveStudentResource, Student>()
            .ForMember(src => src.Semester,
            opt => opt.MapFrom(src => (ESemester)src.Semester));
        }
    }
}