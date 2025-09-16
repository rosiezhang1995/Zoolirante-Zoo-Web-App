namespace ZooWebApp.Dtos
{
	public class EventUpdateDto
	{
		public int EventID { get; set; }  // for PUT validation
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime EventDate { get; set; }
		public TimeSpan EventTime { get; set; }
		public string EventImage { get; set; }
		public string Location { get; set; }
		public List<int> AnimalIds { get; set; } = new(); // only IDs of linked animals
	}

}
