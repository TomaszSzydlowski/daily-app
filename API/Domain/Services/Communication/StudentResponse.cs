using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class StudentResponse : BaseResponse
    {

        public Student Student { get; private set; }

        private StudentResponse(bool success, string message, Student student) : base(success, message)
        {
            Student = student;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="student">Saved student.</param>
        /// <returns>Response.</returns>
        public StudentResponse(Student student) : this(true, string.Empty, student)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public StudentResponse(string message) : this(false, message, null)
        { }
    }
}