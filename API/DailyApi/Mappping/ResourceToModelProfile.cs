using System;
using AutoMapper;
using DailyApi.Domain.Models;
using DailyApi.Resources;

namespace DailyApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveNoteResource, Note>()
              .ForMember(
                 dest => dest.Date,
                 opt => opt.MapFrom(src => DateTime.Parse(src.Date))
              );
        }
    }
}