using System;

namespace DailyApi.Resources
{
    public class ProjectResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CreatedAt { get; set; }
    }
}