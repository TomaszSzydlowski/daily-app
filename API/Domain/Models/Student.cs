using System;
using MongoDB.Bson.Serialization.Attributes;
using netCoreMongoDbApi.Resources;

namespace netCoreMongoDbApi.Domain.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IndexNumber { get; set; }
        public ESemester Semester { get; set; }
    }
}