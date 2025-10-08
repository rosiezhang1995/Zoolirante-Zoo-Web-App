using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZooWebApp.Models
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }

        [Required]
        [StringLength(50)]
        public string BookingReference { get; set; }

        // Is null if not login
        public int? UserID { get; set; }

        [Required]
        [StringLength(200)]
        public string CustomerName { get; set; }

        [Required]
        [StringLength(200)]
        [EmailAddress]
        public string CustomerEmail { get; set; }

        [StringLength(20)]
        public string CustomerPhone { get; set; }

        [Required]
        [Column(TypeName = "Date")]
        public DateTime VisitDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        //Payment and Booking simulation, as always paid
        [Required]
        [StringLength(50)]
        public string BookingStatus { get; set; } = "Confirmed";

        [Required]
        [StringLength(50)]
        public string PaymentStatus { get; set; } = "Paid";

        public int? PaymentMethodID { get; set; }

        [StringLength(100)]
        public string PaymentMethodDisplay { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("UserID")]
        public User User { get; set; }

        [ForeignKey("PaymentMethodID")]
        public PaymentMethod PaymentMethod { get; set; }

        public List<BookingItem> Items { get; set; }
    }
}