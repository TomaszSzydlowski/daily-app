using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Commands.NoteCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class CreateNoteHandler : IRequestHandler<CreateNoteCommand, NoteResponse>
    {
        private readonly INoteService _noteService;
        private readonly IMapper _mapper;

        public CreateNoteHandler(INoteService noteService, IMapper mapper)
        {
            _noteService = noteService;
            _mapper = mapper;
        }

        public async Task<NoteResponse> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var note = _mapper.Map<CreateNoteCommand, Note>(request);
            return await _noteService.SaveAsync(note, request.UserId);
        }
    }
}