using System;

namespace DailyApi.Requests.Filters
{
    public class GetProjectsFilters
    {
        public string Name { get; set; }
        public string[] Ids { get; set; }
    }
}