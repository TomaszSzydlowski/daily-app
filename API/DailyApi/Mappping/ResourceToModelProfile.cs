using System;
using AutoMapper;
using DailyApi.Domain.Models;
using DailyApi.Commands.NoteCommands;
using DailyApi.Commands.ProjectCommands;

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
              )
              .ForMember(
                  desc => desc.ProjectId,
                  opt => opt.MapFrom(src => Guid.Parse(src.ProjectId))
              );
            CreateMap<UpdateNoteCommand, Note>()
            .ForMember(
                dest => dest.Date,
                opt => opt.MapFrom(src => DateTime.Parse(src.Date))
                )
            .ForMember(
                  desc => desc.ProjectId,
                  opt => opt.MapFrom(src => Guid.Parse(src.ProjectId))
                );
            CreateMap<CreateProjectCommand, Project>();
        }
    }
}