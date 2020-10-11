using AutoMapper;
using dailyApi.Resources;
using dailyApi.Domain.Models;

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