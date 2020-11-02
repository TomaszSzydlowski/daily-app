using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApp.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class GetNoteByIdHandler : IRequestHandler<GetNoteByIdQuery, NoteResponse>
    {
        private readonly INoteService _noteService;

        public GetNoteByIdHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NoteResponse> Handle(GetNoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _noteService.GetNoteAsync(request.NoteId, request.UserId);
        }
    }
}