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
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserPaymentMethods(int userId)
        {
            var methods = await _context.PaymentMethods
                .Where(pm => pm.UserID == userId)
                .OrderByDescending(pm => pm.IsDefault)
                .ThenByDescending(pm => pm.CreatedAt)
                .ToListAsync();

            return Ok(methods);
        }

        // POST: api/PaymentMethodsAPI
        [HttpPost]
        public async Task<IActionResult> AddPaymentMethod([FromBody] AddPaymentMethodRequest request)
        {
            if (request.CardNumber.Length < 13 || request.CardNumber.Length > 19)
                return BadRequest(new { message = "Invalid card number" });

            // If setting as default, remove default from other cards
            if (request.IsDefault)
            {
                var existingDefaults = await _context.PaymentMethods
                    .Where(pm => pm.UserID == request.UserID && pm.IsDefault)
                    .ToListAsync();

                foreach (var pm in existingDefaults)
                {
                    pm.IsDefault = false;
                }
            }

            var paymentMethod = new PaymentMethod
            {
                UserID = request.UserID,
                CardHolderName = request.CardHolderName,
                CardType = DetermineCardType(request.CardNumber),
                LastFourDigits = request.CardNumber.Substring(request.CardNumber.Length - 4),
                ExpiryMonth = request.ExpiryMonth,
                ExpiryYear = request.ExpiryYear,
                IsDefault = request.IsDefault,
                CreatedAt = DateTime.Now
            };

            _context.PaymentMethods.Add(paymentMethod);
            await _context.SaveChangesAsync();

            return Ok(paymentMethod);
        }

        // DELETE: api/PaymentMethodsAPI/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod(int id)
        {
            var method = await _context.PaymentMethods.FindAsync(id);
            if (method == null)
                return NotFound();

            _context.PaymentMethods.Remove(method);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Payment method deleted successfully" });
        }

        // PUT: api/PaymentMethodsAPI/{id}/set default
        [HttpPut("{id}/set-default")]
        public async Task<IActionResult> SetDefaultPaymentMethod(int id)
        {
            var method = await _context.PaymentMethods.FindAsync(id);
            if (method == null)
                return NotFound();

            // Remove default from other cards
            var otherDefaults = await _context.PaymentMethods
                .Where(pm => pm.UserID == method.UserID && pm.PaymentMethodID != id && pm.IsDefault)
                .ToListAsync();

            foreach (var pm in otherDefaults)
            {
                pm.IsDefault = false;
            }

            method.IsDefault = true;
            await _context.SaveChangesAsync();

            return Ok(method);
        }

        private string DetermineCardType(string cardNumber)
        {
            if (cardNumber.StartsWith("4")) return "Visa";
            if (cardNumber.StartsWith("5")) return "Mastercard";
            if (cardNumber.StartsWith("3")) return "Amex";
            return "Unknown";
        }
    }
}