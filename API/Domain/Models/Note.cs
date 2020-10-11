using System;

namespace netCoreMongoDbApi.Domain.Models
{
    public class Note
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public int projectId { get; set; }
    }
}