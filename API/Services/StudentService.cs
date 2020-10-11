using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Services
{
    public class StudentService : INoteService
    {
        private readonly INoteRepository _studentRepository;
        private readonly IUnitOfWork _unitOfWork;

        public StudentService(INoteRepository studentRepository, IUnitOfWork unitOfWork)
        {
            _studentRepository = studentRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<NoteResponse> FindAsync(int id)
        {
            try
            {
                var result = await _studentRepository.GetById(id);
                return new NoteResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when getting the student: {ex.Message}");
            }
        }

        public async Task<NotesResponse> ListAsync()
        {
            try
            {
                var result = await _studentRepository.ListAsync();
                return new NotesResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when getting list of students: {ex.Message}");
            }
        }

        public async Task<NoteResponse> AddAsync(Note student)
        {
            try
            {
                _studentRepository.Add(student);
                await _unitOfWork.Commit();

                return new NoteResponse(student);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when saving the student: {ex.Message}");
            }
        }

        public async Task<NoteResponse> UpdateAsync(Note student)
        {
            var exisitngStudent = await _studentRepository.GetById(student.Id);

            if (exisitngStudent == null)
            {
                return new NoteResponse("Student not found.");
            }

            try
            {
                _studentRepository.Update(student);
                await _unitOfWork.Commit();

                return new NoteResponse(student);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when updating the student: {ex.Message}");
            }
        }

        public async Task<NoteResponse> DeleteAsync(int id)
        {
            var exisitngStudent = await _studentRepository.GetById(id);

            if (exisitngStudent == null)
            {
                return new NoteResponse("Student not found.");
            }

            try
            {
                _studentRepository.Remove(id);
                await _unitOfWork.Commit();

                return new NoteResponse(exisitngStudent);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NoteResponse($"An error occurred when removing the student: {ex.Message}");
            }
        }

        public async Task<NotesResponse> DeleteAllAsync()
        {
            var exisitngStudents = await _studentRepository.ListAsync();

            if (exisitngStudents == null)
            {
                return new NotesResponse("Students not found.");
            }

            try
            {
                _studentRepository.RemoveAll();
                await _unitOfWork.Commit();

                return new NotesResponse(exisitngStudents);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new NotesResponse($"An error occurred when removing the student: {ex.Message}");
            }
        }
    }
}