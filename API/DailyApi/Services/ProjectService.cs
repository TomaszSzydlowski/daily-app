using System;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Domain.Repositories;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;

namespace DailyApi.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IProjectRepository projectRepository, IAuthRepository authRepository, IUnitOfWork unitOfWork)
        {
            _projectRepository = projectRepository;
            _authRepository = authRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<ProjectsResponse> GetProjectsAsync(Guid userId, GetProjectsFilters filters = null)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new ProjectsResponse("Invalid user.");
            }

            try
            {
                var result = await _projectRepository.ListAsync(userId, filters);
                return new ProjectsResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new ProjectsResponse($"An error occurred when getting list of notes: {ex.Message}");
            }
        }

        public async Task<ProjectResponse> SaveAsync(Project project, Guid userId)
        {
            var isUserExist = await _authRepository.UserExists(userId);
            if (!isUserExist)
            {
                return new ProjectResponse("Invalid user.");
            }

            project.UserId = userId;

            try
            {
                _projectRepository.Add(project);
                await _unitOfWork.Commit();

                return new ProjectResponse(project);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new ProjectResponse($"An error occurred when saving the project: {ex.Message}");
            }
        }
    }
}