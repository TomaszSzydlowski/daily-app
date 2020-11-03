using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Requests.Filters;

namespace DailyApi.Domain.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<IEnumerable<Project>> ListAsync(Guid userId, GetProjectsFilters filters = null);
    }
}