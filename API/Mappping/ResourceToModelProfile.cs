using AutoMapper;
using dailyApi.Domain.Models;
using dailyApi.Resources;

namespace dailyApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveNoteResource, Note>();
        }
    }
}