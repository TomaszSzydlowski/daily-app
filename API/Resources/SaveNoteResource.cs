using System.ComponentModel.DataAnnotations;

namespace netCoreMongoDbApi.Resources
{
    public class SaveNoteResource
    {
        [Required]
        public string Date { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public int ProjectId { get; set; }
    }
}