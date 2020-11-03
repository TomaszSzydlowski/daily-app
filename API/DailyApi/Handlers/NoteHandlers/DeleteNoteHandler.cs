using System;
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
    public class DeleteNoteHandler : IRequestHandler<DeleteNoteCommand, NoteResponse>
    {
        private readonly INoteService _noteService;

        public DeleteNoteHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NoteResponse> Handle(DeleteNoteCommand request, CancellationToken cancellationToken)
        {
            return await _noteService.DeleteAsync(Guid.Parse(request.NoteId), request.UserId);
        }
    }
}