using System;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;

namespace DailyApi.Domain.Services
{
    public interface INoteService
    {
        Task<NotesResponse> GetNotesAsync(Guid userId, GetNotesFilters filers = null);
        Task<NoteResponse> GetNoteAsync(Guid noteId, Guid userId);
        Task<NoteResponse> SaveAsync(Note note, Guid userId);
        Task<NoteResponse> UpdateAsync(Note note, Guid userId);
        Task<NoteResponse> DeleteAsync(Guid noteId, Guid userId);
        Task<NotesResponse> DeleteAllAsync(Guid userId);
    }
}