using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Controllers.Config;
using DailyApi.Domain.Models;
using DailyApi.Resources;
using DailyApi.Queries;
using DailyApi.Requests.Filters;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DailyApi.Commands.ProjectCommands;

namespace DailyApi.Controllers
{
    [Authorize]
    public class ProjectsController : Controller
    {
        private readonly IMapper _mapper;

        private readonly IMediator _mediator;
        public ProjectsController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        //GET:api/projects
        [HttpGet(ApiRoutes.Projects.GetAll)]
        [ProducesResponseType(typeof(IEnumerable<Project>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> GetAllProjectsAsync([FromQuery] GetProjectsFilters filters)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var query = new GetProjectsQuery(userId, filters);
            var result = await _mediator.Send(query);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var projectsResource = _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectResource>>(result.Projects);

            return Ok(projectsResource);
        }

        //POST:api/notes
        [HttpPost(ApiRoutes.Projects.Post)]
        [ProducesResponseType(typeof(ProjectResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> PostAsync([FromBody] CreateProjectCommand command)
        {
            command.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = await _mediator.Send(command);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var noteResource = _mapper.Map<Project, ProjectResource>(result.Project);
            return Ok(noteResource);
        }
    }
}