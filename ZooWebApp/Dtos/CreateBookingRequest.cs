using System.ComponentModel.DataAnnotations;

namespace ZooWebApp.Models.DTOs
{
    public class CreateBookingRequest
    {
        public int? UserID { get; set; }

        [Required]
        [StringLength(200)]
        public string CustomerName { get; set; }

        [Required]
        [EmailAddress]
        public string CustomerEmail { get; set; }

        [Required]
        public string CustomerPhone { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }

        [Required]
        [MinLength(1)]
        public List<BookingItemRequest> Items { get; set; }

        public int? PaymentMethodID { get; set; }
        public string PaymentMethodDisplay { get; set; }
    }

    public class BookingItemRequest
    {
        [Required]
        public int TicketTypeID { get; set; }

        [Required]
        [Range(1, 20)]
        public int Quantity { get; set; }
    }

    public class AddPaymentMethodRequest
    {
        [Required]
        public int UserID { get; set; }

        [Required]
        [StringLength(200)]
        public string CardHolderName { get; set; }

        [Required]
        [StringLength(19, MinimumLength = 13)]
        public string CardNumber { get; set; }

        [Required]
        [Range(1, 12)]
        public int ExpiryMonth { get; set; }

        [Required]
        [Range(2024, 2050)]
        public int ExpiryYear { get; set; }

    }
}