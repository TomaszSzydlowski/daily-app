using DailyApi.Domain.Models;

namespace DailyApi.Domain.Services.Communication
{
    public class NotesDatesResponse : BaseResponse
    {
        public string[] NotesDates { get; private set; }

        private NotesDatesResponse(bool success, string message, string[] notesDates) : base(success, message)
        {
            NotesDates = notesDates;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="notesDates">Saved notesDates.</param>
        /// <returns>Response.</returns>
        public NotesDatesResponse(string[] notesDates) : this(true, string.Empty, notesDates)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public NotesDatesResponse(string message) : this(false, message, null)
        { }
    }
}