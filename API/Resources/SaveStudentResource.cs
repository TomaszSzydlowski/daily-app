using System.ComponentModel.DataAnnotations;

namespace netCoreMongoDbApi.Resources
{
    public class SaveStudentResource
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        [Required]
        [Range(0, 999999)]
        public int IndexNumber { get; set; }
        [Required]
        [Range(1, 12)]
        public int Semester { get; set; }
    }
}