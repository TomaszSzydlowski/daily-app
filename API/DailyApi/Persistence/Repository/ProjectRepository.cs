using System;
using System.Collections.Generic;
using System.Linq;
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
            var filter = new List<FilterDefinition<Project>>();
            if (filters.Ids != null && filters.Ids.Length > 0)
            {
                var ids = filters.Ids.Select(id => Guid.Parse(id));
                filter.Add(Builders<Project>.Filter.In(p => p.Id, ids));
            }

            filter.Add(Builders<Project>.Filter.Eq(p => p.UserId, userId));

            var rootFilter = Builders<Project>.Filter.And(filter);
            var list = DbSet.Find(rootFilter).SortBy(p => p.CreatedAt);

            return await list.ToListAsync();
        }
    }
}