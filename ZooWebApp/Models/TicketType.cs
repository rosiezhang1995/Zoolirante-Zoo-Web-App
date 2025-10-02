using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class TicketType
    {
        [Key]
        public int TicketTypeID { get; set; }

        [Required]
        [StringLength(100)]
        public string TypeName { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public int MaxQuantityPerBooking { get; set; } = 10;
    }
}