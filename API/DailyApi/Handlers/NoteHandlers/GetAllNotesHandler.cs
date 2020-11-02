using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApp.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class GetAllNotesHandler : IRequestHandler<GetAllNotesQuery, NotesResponse>
    {
        private readonly INoteService _noteService;

        public GetAllNotesHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NotesResponse> Handle(GetAllNotesQuery request, CancellationToken cancellationToken)
        {
            return await _noteService.GetNotesAsync(request.UserId, request.Filter);
        }
    }
}