using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Commands.NoteCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApi.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class UpdateNoteHandler : IRequestHandler<UpdateNoteCommand, NoteResponse>
    {
        private readonly INoteService _noteService;
        private readonly IMapper _mapper;

        public UpdateNoteHandler(INoteService noteService, IMapper mapper)
        {
            _noteService = noteService;
            _mapper = mapper;
        }

        public async Task<NoteResponse> Handle(UpdateNoteCommand request, CancellationToken cancellationToken)
        {
            var note = _mapper.Map<UpdateNoteCommand, Note>(request);
            return await _noteService.UpdateAsync(note, request.UserId);
        }
    }
}