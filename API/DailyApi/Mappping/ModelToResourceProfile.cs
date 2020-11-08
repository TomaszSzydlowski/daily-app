using AutoMapper;
using DailyApi.Domain.Models;
using DailyApi.Resources;

namespace Supermarket.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Note, NoteResource>()
            .ForMember(
                desc => desc.Date,
                opt => opt.MapFrom(src => src.Date.ToUniversalTime().ToString("yyyy-MM-ddTHH:mmZ"))
            )
            .ForMember(
                desc => desc.CreatedAt,
                opt => opt.MapFrom(src => src.CreatedAt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mmZ"))
            )
            .ForMember(
                desc => desc.UpdatedAt,
                opt => opt.MapFrom(src => src.UpdatedAt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mmZ"))
            );
            CreateMap<Project, ProjectResource>()
            .ForMember(
                desc => desc.CreatedAt,
                opt => opt.MapFrom(src => src.CreatedAt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mmZ"))
            );
        }
    }
}