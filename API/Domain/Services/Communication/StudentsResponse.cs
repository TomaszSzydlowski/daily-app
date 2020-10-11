using System.Collections.Generic;
using System.Linq;
using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class StudentsResponse : BaseResponse
    {

        public IEnumerable<Student> Students { get; private set; } = new List<Student>();

        private StudentsResponse(bool success, string message, IEnumerable<Student> students) : base(success, message)
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
        public StudentsResponse(IEnumerable<Student> students) : this(true, string.Empty, students)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public StudentsResponse(string message) : this(false, message, null)
        { }
    }
}