using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooWebApp.Data;
using ZooWebApp.Models;
using ZooWebApp.Models.DTOs;

namespace ZooWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsAPIController : ControllerBase
    {
        private readonly ZooWebAppContext _context;

        public BookingsAPIController(ZooWebAppContext context)
        {
            _context = context;
        }

        // GET: api/BookingsAPI/ticket-types
        [HttpGet("ticket-types")]
        public async Task<IActionResult> GetTicketTypes()
        {
            var types = await _context.TicketTypes
                .Where(t => t.IsActive)
                .OrderBy(t => t.Price)
                .ToListAsync();
            return Ok(types);
        }

        // POST: api/BookingsAPI
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequest request)
        {
            if (request.VisitDate.Date < DateTime.Today)
                return BadRequest(new { message = "Visit date cannot be in the past" });

            if (request.Items == null || !request.Items.Any())
                return BadRequest(new { message = "At least one ticket must be selected" });

            var bookingReference = GenerateBookingReference();
            decimal total = 0;
            var bookingItems = new List<BookingItem>();

            foreach (var item in request.Items)
            {
                var ticketType = await _context.TicketTypes.FindAsync(item.TicketTypeID);
                if (ticketType == null || item.Quantity <= 0) continue;

                var subtotal = ticketType.Price * item.Quantity;
                total += subtotal;

                bookingItems.Add(new BookingItem
                {
                    TicketTypeID = item.TicketTypeID,
                    Quantity = item.Quantity,
                    UnitPrice = ticketType.Price,
                    Subtotal = subtotal
                });
            }

            var booking = new Booking
            {
                BookingReference = bookingReference,
                UserID = request.UserID,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                VisitDate = request.VisitDate,
                TotalAmount = total,
                BookingStatus = "Confirmed",
                PaymentStatus = "Paid",
                PaymentMethodID = request.PaymentMethodID,
                PaymentMethodDisplay = request.PaymentMethodDisplay ?? "Simulated Payment",
                CreatedAt = DateTime.Now
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            foreach (var item in bookingItems)
            {
                item.BookingID = booking.BookingID;
                _context.BookingItems.Add(item);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                bookingID = booking.BookingID,
                bookingReference = bookingReference,
                totalAmount = total,
                message = "Booking created successfully!"
            });
        }

        // GET: api/BookingsAPI/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.BookingID == id);

            if (booking == null)
                return NotFound();

            foreach (var item in booking.Items)
            {
                var ticketType = await _context.TicketTypes.FindAsync(item.TicketTypeID);
                if (ticketType != null)
                    item.TicketTypeName = ticketType.TypeName;
            }

            return Ok(booking);
        }

        // GET: api/BookingsAPI/customer/{email}
        [HttpGet("customer/{email}")]
        public async Task<IActionResult> GetCustomerBookings(string email)
        {
            var bookings = await _context.Bookings
                .Where(b => b.CustomerEmail.ToLower() == email.ToLower())
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return Ok(bookings);
        }

        // GET: api/BookingsAPI/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            var bookings = await _context.Bookings
                .Where(b => b.UserID == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return Ok(bookings);
        }

        // GET: api/BookingsAPI/all - Admin only
        [HttpGet("all")]
        public async Task<IActionResult> GetAllBookings([FromQuery] int? requestingUserId)
        {
            // Check if requesting user is an admin role
            if (!requestingUserId.HasValue)
            {
                return Unauthorized(new { message = "User ID required" });
            }

            if (!await IsUserAdmin(requestingUserId.Value))
            {
                return StatusCode(403, new { message = "Access denied. Admin privileges required." });
            }

            var bookings = await _context.Bookings
                .OrderByDescending(b => b.CreatedAt)
                .Take(100)
                .ToListAsync();

            return Ok(bookings);
        }

        // GET: api/BookingsAPI/statistics for admin only
        [HttpGet("statistics")]
        public async Task<IActionResult> GetBookingStatistics([FromQuery] int requestingUserId)
        {
            if (!await IsUserAdmin(requestingUserId))
            {
                return StatusCode(403, new { message = "Access denied. Admin privileges required." });
            }

            var totalBookings = await _context.Bookings.CountAsync();
            var totalRevenue = await _context.Bookings.SumAsync(b => (decimal?)b.TotalAmount) ?? 0;
            var upcomingBookings = await _context.Bookings
                .Where(b => b.VisitDate >= DateTime.Today)
                .CountAsync();

            return Ok(new
            {
                totalBookings,
                totalRevenue,
                upcomingBookings
            });
        }

        // check if user is admin
        private async Task<bool> IsUserAdmin(int userId)
        {
            var user = await _context.User.FindAsync(userId);
            return user?.IsAdmin ?? false;
        }

        // GET: api/BookingsAPI/user/{userId}/upcoming
        [HttpGet("user/{userId}/upcoming")]
        public async Task<IActionResult> GetUserUpcomingBookings(int userId)
        {
            var now = DateTime.Now;
            var nextDay = now.AddDays(1);

            var bookings = await _context.Bookings
                .Where(b => b.UserID == userId && b.VisitDate >= now && b.VisitDate <= nextDay)
                .OrderBy(b => b.VisitDate)
                .Select(b => new {
                    b.BookingID,
                    b.BookingReference,
                    b.VisitDate,
                    b.TotalAmount,
                    Items = b.Items.Select(i => new {
                        i.BookingItemID,
                        i.Quantity,
                        i.UnitPrice,
                        i.Subtotal,
                        TicketTypeName = i.TicketType.TypeName
                    })
                })
                .ToListAsync();

            return Ok(bookings);
        }



        private string GenerateBookingReference()
        {
            return $"ZOO{DateTime.Now:yyyyMMdd}{new Random().Next(1000, 9999)}";
        }
    }
}