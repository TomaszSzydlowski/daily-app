using AutoMapper;
using netCoreMongoDbApi.Resources;
using netCoreMongoDbApi.Domain.Models;

namespace Supermarket.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Note, NoteResource>();
        }
    }
}