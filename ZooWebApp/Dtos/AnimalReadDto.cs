namespace ZooWebApp.Dtos
{
    public class AnimalReadDto
    {
        public int AnimalId { get; set; }
        public string AnimalName { get; set; }
        public string Description { get; set; }
        public int AnimalAge { get; set; }
        public string Species { get; set; }
        public string Gender { get; set; }
        public string AnimalImage { get; set; }
        public decimal Weight { get; set; }
        public DateTime DateOfArrival { get; set; }
        public string MapImage { get; set; }
    }
}
