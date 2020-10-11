using System.Collections.Generic;
using System.Linq;
using netCoreMongoDbApi.Domain.Models;

namespace netCoreMongoDbApi.Domain.Services.Communication
{
    public class NotesResponse : BaseResponse
    {

        public IEnumerable<Note> Notes { get; private set; } = new List<Note>();

        private NotesResponse(bool success, string message, IEnumerable<Note> notes) : base(success, message)
        {
            if (notes != null)
            {
                var result = Notes.Concat(notes).ToList();
                Notes = result;
            }
  
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="notes">Saved notes.</param>
        /// <returns>Response.</returns>
        public NotesResponse(IEnumerable<Note> notes) : this(true, string.Empty, notes)
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