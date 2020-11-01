using System;

namespace DailyApi.Domain.Models
{
    public class Note
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public int ProjectId { get; set; }
        public Guid UserId { get; set; }
    }
}