using AutoMapper;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Resources;

namespace netCoreMongoDbApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveNoteResource, Note>();
        }
    }
}