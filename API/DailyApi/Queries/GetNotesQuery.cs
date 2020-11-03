using System;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;
using MediatR;

namespace DailyApi.Queries
{
    public class GetNotesQuery : IRequest<NotesResponse>
    {
        public Guid UserId { get; }
        public GetNotesFilters Filter { get; }

        public GetNotesQuery(Guid userId, GetNotesFilters filters)
        {
            UserId = userId;
            Filter = filters;
        }
    }
}