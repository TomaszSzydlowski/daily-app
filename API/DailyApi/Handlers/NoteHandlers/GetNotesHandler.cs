using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApi.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class GetNotesHandler : IRequestHandler<GetNotesQuery, NotesResponse>
    {
        private readonly INoteService _noteService;

        public GetNotesHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NotesResponse> Handle(GetNotesQuery request, CancellationToken cancellationToken)
        {
            return await _noteService.GetNotesAsync(request.UserId, request.Filter);
        }
    }
}