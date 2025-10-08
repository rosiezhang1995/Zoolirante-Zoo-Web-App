using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class BookingItem
    {
        [Key]
        public int BookingItemID { get; set; }

        [Required]
        public int BookingID { get; set; }

        [Required]
        public int TicketTypeID { get; set; }

        [Required]
        [Range(1, 20)]
        public int Quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }

        [ForeignKey("BookingID")]
        public Booking Booking { get; set; }

        [ForeignKey("TicketTypeID")]
        public TicketType TicketType { get; set; }

        [NotMapped]
        public string TicketTypeName { get; set; }
    }
}