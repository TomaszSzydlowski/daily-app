using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApi.Queries;
using MediatR;

namespace DailyApi.Handlers.ProjectHandlers
{
    public class GetProjectsHandler : IRequestHandler<GetProjectsQuery, ProjectsResponse>
    {
        private readonly IProjectService _projectService;

        public GetProjectsHandler(IProjectService projectService)
        {
            _projectService = projectService;
        }

        public async Task<ProjectsResponse> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
        {
            return await _projectService.GetProjectsAsync(request.UserId, request.Filter);
        }
    }
}