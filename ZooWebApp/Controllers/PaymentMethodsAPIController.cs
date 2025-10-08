using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooWebApp.Data;
using ZooWebApp.Models;
using ZooWebApp.Models.DTOs;

namespace ZooWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentMethodsAPIController : ControllerBase
    {
        private readonly ZooWebAppContext _context;

        public PaymentMethodsAPIController(ZooWebAppContext context)
        {
            _context = context;
        }

        // GET: api/PaymentMethodsAPI/user/{userId}
        // Returns the payment method for a user (changed to only one allowed per user)
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserPaymentMethod(int userId)
        {
            var method = await _context.PaymentMethods
                .Where(pm => pm.UserID == userId)
                .Select(pm => new
                {
                    pm.PaymentMethodID,
                    pm.UserID,
                    pm.CardHolderName,
                    pm.CardType,
                    pm.LastFourDigits,
                    pm.ExpiryMonth,
                    pm.ExpiryYear,
                    pm.CreatedAt,
                    CardDisplay = $"{pm.CardType} •••• {pm.LastFourDigits}",
                    ExpiryDisplay = $"{pm.ExpiryMonth:00}/{pm.ExpiryYear}",
                    IsExpired = (pm.ExpiryYear < DateTime.Now.Year) ||
                               (pm.ExpiryYear == DateTime.Now.Year && pm.ExpiryMonth < DateTime.Now.Month)
                })
                .FirstOrDefaultAsync();

            if (method == null)
                return NotFound(new { message = "No payment method found" });

            return Ok(method);
        }

        // POST: api/PaymentMethodsAPI
        [HttpPost]
        public async Task<IActionResult> AddPaymentMethod([FromBody] AddPaymentMethodRequest request)
        {
            // Validate card number
            if (string.IsNullOrWhiteSpace(request.CardNumber) ||
                request.CardNumber.Length < 13 ||
                request.CardNumber.Length > 19)
            {
                return BadRequest(new { message = "Invalid card number length" });
            }

            // Validate expiry date
            if (request.ExpiryYear < DateTime.Now.Year ||
                (request.ExpiryYear == DateTime.Now.Year && request.ExpiryMonth < DateTime.Now.Month))
            {
                return BadRequest(new { message = "Card has expired" });
            }

            // Check if user exists
            var userExists = await _context.User.AnyAsync(u => u.UserID == request.UserID);
            if (!userExists)
            {
                return NotFound(new { message = "User not found" });
            }

            // Check if user already has a payment method 
            var existingMethod = await _context.PaymentMethods
                .FirstOrDefaultAsync(pm => pm.UserID == request.UserID);

            if (existingMethod != null)
            {
                return BadRequest(new { message = "User already has a payment method. Please delete the existing one before adding a new one." });
            }

            // Create new payment method
            var paymentMethod = new PaymentMethod
            {
                UserID = request.UserID,
                CardHolderName = request.CardHolderName,
                CardType = DetermineCardType(request.CardNumber),
                LastFourDigits = request.CardNumber.Substring(request.CardNumber.Length - 4),
                ExpiryMonth = request.ExpiryMonth,
                ExpiryYear = request.ExpiryYear,
                IsDefault = true,
                CreatedAt = DateTime.Now
            };

            _context.PaymentMethods.Add(paymentMethod);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                paymentMethod.PaymentMethodID,
                paymentMethod.UserID,
                paymentMethod.CardHolderName,
                paymentMethod.CardType,
                paymentMethod.LastFourDigits,
                paymentMethod.ExpiryMonth,
                paymentMethod.ExpiryYear,
                paymentMethod.CreatedAt,
                CardDisplay = $"{paymentMethod.CardType} •••• {paymentMethod.LastFourDigits}",
                message = "Payment method added successfully"
            });
        }

        // DELETE: api/PaymentMethodsAPI/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod(int id, [FromQuery] int userId)
        {
            try
            {
                // Validate input parameters
                if (id <= 0 || userId <= 0)
                {
                    return BadRequest(new { message = "Invalid payment method ID or user ID" });
                }

                // Find the payment method
                var method = await _context.PaymentMethods.FindAsync(id);

                if (method == null)
                {
                    return NotFound(new { message = "Payment method not found" });
                }

                // Verify the payment method belongs to the requesting user
                if (method.UserID != userId)
                {
                    return StatusCode(403, new { message = "You don't have permission to delete this payment method" });
                }

                // Check for related bookings and set PaymentMethodID to NULL
                var relatedBookings = await _context.Bookings
                    .Where(b => b.PaymentMethodID == id)
                    .ToListAsync();

                if (relatedBookings.Count > 0)
                {
                    foreach (var booking in relatedBookings)
                    {
                        booking.PaymentMethodID = null;
                    }
                    await _context.SaveChangesAsync();
                }

                // Delete the payment method
                _context.PaymentMethods.Remove(method);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Payment method deleted successfully",
                    bookingsUpdated = relatedBookings.Count
                });
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"Database error deleting payment method: {dbEx.InnerException?.Message ?? dbEx.Message}");
                return StatusCode(500, new
                {
                    message = "Database error occurred while deleting payment method. Please try again."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting payment method: {ex.Message}");
                return StatusCode(500, new
                {
                    message = "An unexpected error occurred while deleting payment method"
                });
            }
        }

        private string DetermineCardType(string cardNumber)
        {
            if (string.IsNullOrWhiteSpace(cardNumber))
                return "Unknown";

            // Remove spaces and dashes
            cardNumber = cardNumber.Replace(" ", "").Replace("-", "");

            if (cardNumber.StartsWith("4")) return "Visa";
            if (cardNumber.StartsWith("5")) return "Mastercard";
            if (cardNumber.StartsWith("37") || cardNumber.StartsWith("34")) return "Amex";
            if (cardNumber.StartsWith("6")) return "Discover";

            return "Unknown";
        }
    }
}