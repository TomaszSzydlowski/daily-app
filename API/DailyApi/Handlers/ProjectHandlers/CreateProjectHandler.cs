using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Commands.NoteCommands;
using DailyApi.Commands.ProjectCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Handlers.NoteHandlers
{
    public class CreateProjectHandler : IRequestHandler<CreateProjectCommand, ProjectResponse>
    {
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public CreateProjectHandler(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        public async Task<ProjectResponse> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var project = _mapper.Map<CreateProjectCommand, Project>(request);
            return await _projectService.SaveAsync(project, request.UserId);
        }
    }
}