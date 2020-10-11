using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class NoteResponse : BaseResponse
    {

        public Note Note { get; private set; }

        private NoteResponse(bool success, string message, Note note) : base(success, message)
        {
            Note = note;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="note">Saved note.</param>
        /// <returns>Response.</returns>
        public NoteResponse(Note note) : this(true, string.Empty, note)
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