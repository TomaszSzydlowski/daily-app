using DailyApi.Domain.Models;

namespace DailyApi.Domain.Services.Communication
{
    public class ProjectResponse : BaseResponse
    {

        public Project Project { get; private set; }

        private ProjectResponse(bool success, string message, Project project) : base(success, message)
        {
            Project = project;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="project">Saved project.</param>
        /// <returns>Response.</returns>
        public ProjectResponse(Project project) : this(true, string.Empty, project)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public ProjectResponse(string message) : this(false, message, null)
        { }
    }
}