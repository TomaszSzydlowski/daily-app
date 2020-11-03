using System;
using System.Threading.Tasks;
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

        public ProjectService(IProjectRepository projectRepository, IAuthRepository authRepository)
        {
            _projectRepository = projectRepository;
            _authRepository = authRepository;
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
                var result = await _projectRepository.ListAsync(userId);
                return new ProjectsResponse(result);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new ProjectsResponse($"An error occurred when getting list of notes: {ex.Message}");
            }
        }
    }
}