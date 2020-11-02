using System.Threading;
using System.Threading.Tasks;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using DailyApp.Queries;
using MediatR;

namespace DailyApi.Handlers.ProjectHandlers
{
    public class GetAllProjectsHandler : IRequestHandler<GetAllProjectsQuery, ProjectsResponse>
    {
        private readonly IProjectService _projectService;

        public GetAllProjectsHandler(IProjectService projectService)
        {
            _projectService = projectService;
        }

        public async Task<ProjectsResponse> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
        {
            return await _projectService.GetProjectsAsync(request.UserId, request.Filter);
        }
    }
}