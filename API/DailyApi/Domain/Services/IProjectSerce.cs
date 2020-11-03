using System;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;

namespace DailyApi.Domain.Services
{
    public interface IProjectService
    {
        Task<ProjectsResponse> GetProjectsAsync(Guid userId, GetProjectsFilters filters = null);
        Task<ProjectResponse> SaveAsync(Project project, Guid userId);
    }
}