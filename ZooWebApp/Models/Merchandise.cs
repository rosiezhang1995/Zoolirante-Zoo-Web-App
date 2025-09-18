using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ZooWebApp.Models
{
	public class Merchandise
	{
		[Key]
		[Display(Name = "Merchandise Id")]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int MerchandiseID { get; set; }

		[Required]
		[Display(Name = "Animal Name")]
		[StringLength(50, ErrorMessage = "Merch Name must be no more than 50 characters")]
		public string MerchandiseName { get; set; }

		[Display(Name = "Animal Description")]
		[StringLength(500, ErrorMessage = "Description must be no more than 500 characters")]
		public string? Description { get; set; }

		[Required]
		[Display(Name = "Price")]
		[DataType(DataType.Currency)]
		[Column(TypeName = "decimal(10,2)")]
		public decimal Price { get; set; }

		[Required]
		[Display(Name = "Stock Availability")]
		public Boolean Avaliable { get; set; }

		[Display(Name = "Animal Image")]
		public string? MerchandiseImage { get; set; }

		[Display(Name = "Size")]
		public string? Size { get; set; }
    }
}
