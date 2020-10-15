using System;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApp.Queries
{
    public class GetNoteByIdQuery : IRequest<NoteResponse>
    {
        public Guid NoteId { get; }
        public Guid UserId { get; }

        public GetNoteByIdQuery(Guid noteId, Guid userId)
        {
            NoteId = noteId;
            UserId = userId;
        }
    }
}