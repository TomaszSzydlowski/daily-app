using System;
using AutoMapper;
using DailyApi.Domain.Models;
using DailyApi.Commands.NoteCommands;

namespace DailyApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<CreateNoteCommand, Note>()
              .ForMember(
                 dest => dest.Date,
                 opt => opt.MapFrom(src => DateTime.Parse(src.Date))
              );
            CreateMap<UpdateNoteCommand, Note>()
            .ForMember(
                dest => dest.Date,
                opt => opt.MapFrom(src => DateTime.Parse(src.Date))
                );
        }
    }
}