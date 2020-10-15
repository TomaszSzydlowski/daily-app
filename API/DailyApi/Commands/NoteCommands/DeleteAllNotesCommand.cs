using System;
using System.ComponentModel.DataAnnotations;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Commands.NoteCommands
{
    public class DeleteAllNotesCommand : IRequest<NotesResponse>
    {
        public Guid UserId { get; set; }
    }
}