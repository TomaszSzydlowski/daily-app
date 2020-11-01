using System;
using DailyApi.Domain.Services.Communication;
using DailyApp.Requests.Filters;
using MediatR;

namespace DailyApp.Queries
{
    public class GetAllNotesQuery : IRequest<NotesResponse>
    {
        public Guid UserId { get; }
        public GetAllNotesFilters Filter { get; }

        public GetAllNotesQuery(Guid userId, GetAllNotesFilters filters)
        {
            UserId = userId;
            Filter = filters;
        }
    }
}