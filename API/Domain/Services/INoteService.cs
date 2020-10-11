using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Domain.Services
{
    public interface INoteService
    {
        Task<NoteResponse> FindAsync(int id);
        Task<NotesResponse> ListAsync();

        Task<NoteResponse> AddAsync(Note student);

        Task<NoteResponse> UpdateAsync(Note student);

        Task<NoteResponse> DeleteAsync(int id);
        Task<NotesResponse> DeleteAllAsync();
    }
}