using System;

namespace dailyApi.Resources
{
    public class NoteResource
    {
        public Guid Id { get; set; }
        public string Date { get; set; }
        public string Content { get; set; }
        public int ProjectId { get; set; }
    }
}