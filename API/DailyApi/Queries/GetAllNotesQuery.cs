using System;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApp.Queries
{
    public class GetAllNotesQuery : IRequest<NotesResponse>
    {
        public Guid UserId { get; }

        public GetAllNotesQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}