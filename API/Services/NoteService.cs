using System;
using System.Threading.Tasks;
using dailyApi.Domain.Repositories;
using dailyApi.Domain.Models;
using dailyApi.Domain.Services;
using dailyApi.Domain.Services.Communication;

namespace dailyApi.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;

        private readonly IAuthRepository _authRepository;
        private readonly IUnitOfWork _unitOfWork;

        public NoteService(INoteRepository noteRepository, IAuthRepository authRepository, IUnitOfWork unitOfWork)
        {
            _noteRepository = noteRepository;
            _authRepository = authRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<NotesResponse> ListAsync(Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new NotesResponse("Invalid user.");
            }

            try
            {
                var result = await _noteRepository.ListAsync(userId);
                return new NotesResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when getting list of notes: {ex.Message}");
            }
        }

        public async Task<NoteResponse> FindAsync(Guid noteId, Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new NoteResponse("Invalid user.");
            }

            var exisitingNote = await _noteRepository.GetById(noteId);

            if (exisitingNote == null)
            {
                return new NoteResponse("Note not found.");
            }

            try
            {
                return new NoteResponse(exisitingNote);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when getting the note: {ex.Message}");
            }
        }

        public async Task<NoteResponse> SaveAsync(Note note, Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new NoteResponse("Invalid user.");
            }

            note.UserId = userId;

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

        public async Task<NoteResponse> UpdateAsync(Note note, Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new NoteResponse("Invalid user.");
            }

            var exisitingNote = await _noteRepository.GetById(note.Id);

            if (exisitingNote == null)
            {
                return new NoteResponse("Note not found.");
            }

            try
            {
                _noteRepository.Update(exisitingNote);
                await _unitOfWork.Commit();

                return new NoteResponse(exisitingNote);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when updating the note: {ex.Message}");
            }
        }

        public async Task<NoteResponse> DeleteAsync(Guid noteId, Guid userId)
        {
            var note = await _noteRepository.GetById(noteId);
            var isUserExist = await _authRepository.UserExists(userId);

            if (!isUserExist)
            {
                return new NoteResponse("Invalid user.");
            }

            if (note.UserId != userId)
            {
                return new NoteResponse("The user is not authorized to delete this note.");
            }

            try
            {
                _noteRepository.Remove(noteId);
                await _unitOfWork.Commit();

                return new NoteResponse(note);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when deleting the note: {ex.Message}");
            }
        }

        public async Task<NotesResponse> DeleteAllAsync(Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);

            if (!isUserExist)
            {
                return new NotesResponse("Invalid user.");
            }

            try
            {
                var removedNotes = await _noteRepository.ListAsync(userId);

                _noteRepository.RemoveAll(userId);
                await _unitOfWork.Commit();

                return new NotesResponse(removedNotes);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when deleting the note: {ex.Message}");
            }
        }
    }
}