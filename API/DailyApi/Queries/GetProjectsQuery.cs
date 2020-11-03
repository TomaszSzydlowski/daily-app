using System;
using DailyApi.Domain.Services.Communication;
using DailyApi.Requests.Filters;
using MediatR;

namespace DailyApi.Queries
{
    public class GetProjectsQuery : IRequest<ProjectsResponse>
    {
        public Guid UserId { get; }
        public GetProjectsFilters Filter { get; }

        public GetProjectsQuery(Guid userId, GetProjectsFilters filters)
        {
            UserId = userId;
            Filter = filters;
        }
    }
}