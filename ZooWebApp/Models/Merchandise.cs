namespace ZooWebApp.Models
{
	public class Merchandise
	{
        public int MerchandiseID { get; set; }

        public string MerchandiseName { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public Boolean Avaliable { get; set; }

        public string MerchandiseImage { get; set; }

        public string? Size { get; set; }
    }
}
