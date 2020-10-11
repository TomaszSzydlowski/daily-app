using System.Collections.Generic;
using System.Linq;
using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class NotesResponse : BaseResponse
    {

        public IEnumerable<Note> Students { get; private set; } = new List<Note>();

        private NotesResponse(bool success, string message, IEnumerable<Note> students) : base(success, message)
        {
            if (students != null)
            {
                var result = Students.Concat(students).ToList();
                Students = result;
            }
  
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="students">Saved students.</param>
        /// <returns>Response.</returns>
        public NotesResponse(IEnumerable<Note> students) : this(true, string.Empty, students)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public NotesResponse(string message) : this(false, message, null)
        { }
    }
}