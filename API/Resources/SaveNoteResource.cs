using System.ComponentModel.DataAnnotations;

namespace netCoreMongoDbApi.Resources
{
    public class SaveNoteResource
    {
        public string Id { get; set; }

        [Required]
        public string Date { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public int ProjectId { get; set; }
    }
}