using System.Collections.Generic;
using System.Linq;
using DailyApi.Domain.Models;

namespace DailyApi.Domain.Services.Communication
{
    public class ProjectsResponse : BaseResponse
    {
        public IEnumerable<Project> Projects { get; private set; } = new List<Project>();

        private ProjectsResponse(bool success, string message, IEnumerable<Project> projects) : base(success, message)
        {
            if (projects != null)
            {
                var result = Projects.Concat(projects).ToList();
                Projects = result;
            }

        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="projects">Saved projects.</param>
        /// <returns>Response.</returns>
        public ProjectsResponse(IEnumerable<Project> projects) : this(true, string.Empty, projects)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public ProjectsResponse(string message) : this(false, message, null)
        { }
    }
}