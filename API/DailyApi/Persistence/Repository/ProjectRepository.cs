using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DailyApi.Domain.Models;
using DailyApi.Domain.Repositories;
using DailyApi.Requests.Filters;
using MongoDB.Driver;

namespace DailyApi.Persistence.Repositories
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        protected override string _collectionName { get { return "projects"; } }

        public ProjectRepository(IAppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Project>> ListAsync(Guid userId, GetProjectsFilters filters = null)
        {
            ConfigDbSet();
            IAsyncCursor<Project> filteredProjects;
            var filterBuilder = Builders<Project>.Filter;
            if (filters != null)
            {
                throw new NotImplementedException();
            }
            else
            {
                filteredProjects = await DbSet.FindAsync(filterBuilder.Eq(x => x.UserId, userId));
            }
            return filteredProjects.ToList();
        }
    }
}