using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class NoteResponse : BaseResponse
    {

        public Note Student { get; private set; }

        private NoteResponse(bool success, string message, Note student) : base(success, message)
        {
            Student = student;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="student">Saved student.</param>
        /// <returns>Response.</returns>
        public NoteResponse(Note student) : this(true, string.Empty, student)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public NoteResponse(string message) : this(false, message, null)
        { }
    }
}