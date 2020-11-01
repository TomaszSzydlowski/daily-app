using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using DailyApi.Commands.NoteCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using System;
using Microsoft.AspNetCore.Authorization;
using DailyApi.Controllers.Config;
using MediatR;
using DailyApp.Queries;
using DailyApi.Resources;

namespace DailyApi.Controllers
{
    [Authorize]
    public class NotesController : Controller
    {
        private readonly INoteService _noteService;

        private readonly IMapper _mapper;

        private readonly IMediator _mediator;

        public NotesController(INoteService noteService, IMapper mapper, IMediator mediator)
        {
            _noteService = noteService;
            _mapper = mapper;
            _mediator = mediator;
        }

        //GET:api/notes
        [HttpGet(ApiRoutes.Notes.GetAll)]
        [ProducesResponseType(typeof(IEnumerable<Note>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> GetAllNotesAsync([FromQuery] string date)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var query = new GetAllNotesQuery(userId, date);
            var result = await _mediator.Send(query);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<IEnumerable<Note>, IEnumerable<NoteResource>>(result.Notes);

            return Ok(notesResource);
        }

        //GET:api/notes/id
        [HttpGet(ApiRoutes.Notes.Get)]
        [ProducesResponseType(typeof(IEnumerable<Note>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> GetNoteAsync(Guid noteId)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var query = new GetNoteByIdQuery(noteId, userId);
            var result = await _mediator.Send(query);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var noteResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(noteResource);
        }

        //POST:api/notes
        [HttpPost(ApiRoutes.Notes.Post)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> PostAsync([FromBody] CreateNoteCommand command)
        {
            command.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _mediator.Send(command);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var noteResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(noteResource);
        }

        // Put: api/notes/id
        [HttpPut(ApiRoutes.Notes.Update)]
        [ProducesResponseType(typeof(NoteResource), 201)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateNoteCommand command)
        {
            command.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _mediator.Send(command);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(notesResource);
        }

        // DELETE: api/notes/id
        [HttpDelete(ApiRoutes.Notes.Delete)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAsync(DeleteNoteCommand command)
        {
            command.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _mediator.Send(command);

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(notesResource);
        }

        // DELETE: api/notes
        [HttpDelete(ApiRoutes.Notes.DeleteAll)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAllAsync(DeleteAllNotesCommand command)
        {
            command.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _mediator.Send(command);

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<IEnumerable<Note>, IEnumerable<NoteResource>>(result.Notes);
            return Ok(notesResource);
        }
    }
}