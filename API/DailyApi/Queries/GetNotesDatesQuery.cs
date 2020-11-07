using System;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Queries
{
    public class GetNotesDatesQuery : IRequest<NotesDatesResponse>
    {
        public Guid UserId { get; }

        public GetNotesDatesQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}