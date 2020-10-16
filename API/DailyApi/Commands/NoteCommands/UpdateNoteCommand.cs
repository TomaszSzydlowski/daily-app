using System;
using System.ComponentModel.DataAnnotations;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Commands.NoteCommands
{
    public class UpdateNoteCommand : IRequest<NoteResponse>
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public int ProjectId { get; set; }
        public Guid UserId { get; set; }
    }
}