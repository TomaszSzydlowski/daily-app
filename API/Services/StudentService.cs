using System;
using System.Threading.Tasks;
using netCoreMongoDbApi.Domain.Repositories;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services;
using netCoreMongoDbApi.Domain.Services.Communication;

namespace netCoreMongoDbApi.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IUnitOfWork _unitOfWork;

        public StudentService(IStudentRepository studentRepository, IUnitOfWork unitOfWork)
        {
            _studentRepository = studentRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<StudentResponse> FindAsync(int id)
        {
            try
            {
                var result = await _studentRepository.GetById(id);
                return new StudentResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentResponse($"An error occurred when getting the student: {ex.Message}");
            }
        }

        public async Task<StudentsResponse> ListAsync()
        {
            try
            {
                var result = await _studentRepository.ListAsync();
                return new StudentsResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentsResponse($"An error occurred when getting list of students: {ex.Message}");
            }
        }

        public async Task<StudentResponse> AddAsync(Student student)
        {
            try
            {
                _studentRepository.Add(student);
                await _unitOfWork.Commit();

                return new StudentResponse(student);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentResponse($"An error occurred when saving the student: {ex.Message}");
            }
        }

        public async Task<StudentResponse> UpdateAsync(Student student)
        {
            var exisitngStudent = await _studentRepository.GetById(student.Id);

            if (exisitngStudent == null)
            {
                return new StudentResponse("Student not found.");
            }

            try
            {
                _studentRepository.Update(student);
                await _unitOfWork.Commit();

                return new StudentResponse(student);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentResponse($"An error occurred when updating the student: {ex.Message}");
            }
        }

        public async Task<StudentResponse> DeleteAsync(int id)
        {
            var exisitngStudent = await _studentRepository.GetById(id);

            if (exisitngStudent == null)
            {
                return new StudentResponse("Student not found.");
            }

            try
            {
                _studentRepository.Remove(id);
                await _unitOfWork.Commit();

                return new StudentResponse(exisitngStudent);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentResponse($"An error occurred when removing the student: {ex.Message}");
            }
        }

        public async Task<StudentsResponse> DeleteAllAsync()
        {
            var exisitngStudents = await _studentRepository.ListAsync();

            if (exisitngStudents == null)
            {
                return new StudentsResponse("Students not found.");
            }

            try
            {
                _studentRepository.RemoveAll();
                await _unitOfWork.Commit();

                return new StudentsResponse(exisitngStudents);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new StudentsResponse($"An error occurred when removing the student: {ex.Message}");
            }
        }
    }
}