using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Domain.Services
{
    public interface IStudentService
    {
        Task<StudentResponse> FindAsync(int id);
        Task<StudentsResponse> ListAsync();

        Task<StudentResponse> AddAsync(Student student);

        Task<StudentResponse> UpdateAsync(Student student);

        Task<StudentResponse> DeleteAsync(int id);
        Task<StudentsResponse> DeleteAllAsync();
    }
}