using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Domain.Services
{
    public interface INoteService
    {
        Task<NotesResponse> ListAsync(Guid userId);
        Task<NoteResponse> FindAsync(Guid noteId, Guid userId);


        Task<NoteResponse> SaveAsync(Note note, Guid userId);

        Task<NoteResponse> UpdateAsync(Note note, Guid userId);

        Task<NoteResponse> DeleteAsync(Guid noteId, Guid userId);
        Task<NotesResponse> DeleteAllAsync(Guid userId);
    }
}