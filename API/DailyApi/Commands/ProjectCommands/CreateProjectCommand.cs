using System;
using System.ComponentModel.DataAnnotations;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Commands.ProjectCommands
{
    public class CreateProjectCommand : IRequest<ProjectResponse>
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Guid UserId { get; set; }
    }
}