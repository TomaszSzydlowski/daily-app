using AutoMapper;
using DailyApi.Resources;
using DailyApi.Domain.Models;

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