using System;
using System.ComponentModel.DataAnnotations;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Commands.NoteCommands
{
    public class DeleteNoteCommand : IRequest<NoteResponse>
    {
        [Required]
        public string NoteId { get; set; }
        public Guid UserId { get; set; }
    }
}