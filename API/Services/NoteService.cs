using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;
        private readonly IUnitOfWork _unitOfWork;

        public NoteService(INoteRepository noteRepository, IUnitOfWork unitOfWork)
        {
            _noteRepository = noteRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<NoteResponse> FindAsync(Guid id)
        {
            try
            {
                var result = await _noteRepository.GetById(id);
                return new NoteResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when getting the note: {ex.Message}");
            }
        }

        public async Task<NotesResponse> ListAsync()
        {
            try
            {
                var result = await _noteRepository.ListAsync();
                return new NotesResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when getting list of notes: {ex.Message}");
            }
        }

        public async Task<NoteResponse> AddAsync(Note note)
        {
            try
            {
                _noteRepository.Add(note);
                await _unitOfWork.Commit();

                return new NoteResponse(note);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when saving the note: {ex.Message}");
            }
        }

        public async Task<NoteResponse> UpdateAsync(Note note)
        {
            var exisitngNote = await _noteRepository.GetById(note.Id);

            if (exisitngNote == null)
            {
                return new NoteResponse("Note not found.");
            }

            try
            {
                _noteRepository.Update(note);
                await _unitOfWork.Commit();

                return new NoteResponse(note);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when updating the note: {ex.Message}");
            }
        }

        public async Task<NoteResponse> DeleteAsync(Guid id)
        {
            var exisitngNote = await _noteRepository.GetById(id);

            if (exisitngNote == null)
            {
                return new NoteResponse("Note not found.");
            }

            try
            {
                _noteRepository.Remove(id);
                await _unitOfWork.Commit();

                return new NoteResponse(exisitngNote);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when removing the note: {ex.Message}");
            }
        }

        public async Task<NotesResponse> DeleteAllAsync()
        {
            var exisitngNotes = await _noteRepository.ListAsync();

            if (exisitngNotes == null)
            {
                return new NotesResponse("Notes not found.");
            }

            try
            {
                _noteRepository.RemoveAll();
                await _unitOfWork.Commit();

                return new NotesResponse(exisitngNotes);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when removing the note: {ex.Message}");
            }
        }
    }
}