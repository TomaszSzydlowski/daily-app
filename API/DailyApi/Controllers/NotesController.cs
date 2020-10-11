using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using DailyApi.Resources;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using System;
using Microsoft.AspNetCore.Authorization;
using DailyApi.Controllers.Config;

namespace DailyApi.Controllers
{
    [Authorize]
    public class NotesController : Controller
    {
        private readonly INoteService _noteService;

        private readonly IMapper _mapper;

        public NotesController(INoteService noteService, IMapper mapper)
        {
            _noteService = noteService;
            _mapper = mapper;
        }

        //GET:api/notes
        [HttpGet(ApiRoutes.Notes.GetAll)]
        [ProducesResponseType(typeof(IEnumerable<Note>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> ListAsync()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _noteService.ListAsync(userId);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<IEnumerable<Note>, IEnumerable<NoteResource>>(result.Notes);

            return Ok(notesResource);
        }

        //GET:api/notes/id
        [HttpGet(ApiRoutes.Notes.Get)]
        [ProducesResponseType(typeof(IEnumerable<Note>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> FindAsync(Guid noteId)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _noteService.FindAsync(noteId, userId);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var noteResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(noteResource);
        }

        //POST:api/notes
        [HttpPost(ApiRoutes.Notes.Post)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> PostAsync([FromBody] SaveNoteResource resource)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var note = _mapper.Map<SaveNoteResource, Note>(resource);
            var result = await _noteService.SaveAsync(note, userId);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var noteResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(noteResource);
        }

        // Put: api/notes/id
        [HttpPut(ApiRoutes.Notes.Update)]
        [ProducesResponseType(typeof(NoteResource), 201)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> UpdateAsync([FromBody] SaveNoteResource resource)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var note = _mapper.Map<SaveNoteResource, Note>(resource);
            var result = await _noteService.UpdateAsync(note, userId);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(notesResource);
        }

        // DELETE: api/notes/id
        [HttpDelete(ApiRoutes.Notes.Delete)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAsync(Guid noteId)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var result = await _noteService.DeleteAsync(noteId, userId);

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<Note, NoteResource>(result.Note);
            return Ok(notesResource);
        }

        // DELETE: api/notes
        [HttpDelete(ApiRoutes.Notes.DeleteAll)]
        [ProducesResponseType(typeof(NoteResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAllAsync()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var result = await _noteService.DeleteAllAsync(userId);

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var notesResource = _mapper.Map<IEnumerable<Note>, IEnumerable<NoteResource>>(result.Notes);
            return Ok(notesResource);
        }
    }
}