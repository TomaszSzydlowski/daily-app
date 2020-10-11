namespace netCoreMongoDbApi.Resources
{
    public class NoteResource
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Content { get; set; }
        public int ProjectId { get; set; }
    }
}