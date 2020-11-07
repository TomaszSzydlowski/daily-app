using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApi.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class GetNotesDatesHandler : IRequestHandler<GetNotesDatesQuery, NotesDatesResponse>
    {
        private readonly INoteService _noteService;

        public GetNotesDatesHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NotesDatesResponse> Handle(GetNotesDatesQuery request, CancellationToken cancellationToken)
        {
            return await _noteService.GetNotesDatesAsync(request.UserId);
        }
    }
}