using System;
using DailyApi.Domain.Services.Communication;
using DailyApp.Requests.Filters;
using MediatR;

namespace DailyApp.Queries
{
    public class GetAllProjectsQuery : IRequest<ProjectsResponse>
    {
        public Guid UserId { get; }
        public GetAllProjectsFilters Filter { get; }

        public GetAllProjectsQuery(Guid userId, GetAllProjectsFilters filters)
        {
            UserId = userId;
            Filter = filters;
        }
    }
}