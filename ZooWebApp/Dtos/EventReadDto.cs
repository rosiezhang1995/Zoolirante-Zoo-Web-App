namespace ZooWebApp.Dtos
{
    public class EventReadDto
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public TimeSpan EventTime { get; set; }
        public string EventImage { get; set; }
        public string Location { get; set; }
        public List<AnimalReadDto> Animals { get; set; } = new();
    }
}
