using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Commands.NoteCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApp.Queries;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class DeleteAllNotesHandler : IRequestHandler<DeleteAllNotesCommand, NotesResponse>
    {
        private readonly INoteService _noteService;

        public DeleteAllNotesHandler(INoteService noteService)
        {
            _noteService = noteService;
        }

        public async Task<NotesResponse> Handle(DeleteAllNotesCommand request, CancellationToken cancellationToken)
        {
            return await _noteService.DeleteAllAsync(request.UserId);
        }
    }
}