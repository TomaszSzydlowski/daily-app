using System;

namespace DailyApi.Resources
{
    public class NoteResource
    {
        public Guid Id { get; set; }
        public string Date { get; set; }
        public string Content { get; set; }
        public Guid ProjectId { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}