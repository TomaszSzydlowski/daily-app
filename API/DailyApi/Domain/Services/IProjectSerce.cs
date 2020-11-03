using System;
using System.Threading.Tasks;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;

namespace DailyApi.Domain.Services
{
    public interface IProjectService
    {
        Task<ProjectsResponse> GetProjectsAsync(Guid userId, GetProjectsFilters filters = null);
    }
}