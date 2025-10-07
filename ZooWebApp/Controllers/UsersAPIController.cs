using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooWebApp.Data;
using ZooWebApp.Models;
using ZooWebApp.Helpers;
using ZooWebApp.Dtos;

namespace ZooWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersAPIController : ControllerBase
    {
        private readonly ZooWebAppContext _context;

        public UsersAPIController(ZooWebAppContext context)
        {
            _context = context;
        }

        // GET: api/UsersAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User
                .Include(u => u.FavouriteAnimals)
                .Include(u => u.SavedEvents)
                .ToListAsync();
        }

        // GET: api/UsersAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/UsersAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UsersAPI/signup
        [HttpPost("signup")]
        public async Task<ActionResult<User>> Signup(User user)
        {
            // Hash the password before saving
            user.PasswordHash = PasswordHelper.HashPassword(user.PasswordHash);

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        }

        // POST: api/UsersAPI/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserLoginDto loginRequest)
        {
            var user = await _context.User
                .Include(u => u.FavouriteAnimals)
                .Include(u => u.SavedEvents)
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null || !PasswordHelper.VerifyPassword(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new
            {
                userID = user.UserID,
                username = user.Username,
                email = user.Email,          
                fullName = user.FullName,     
                isAdmin = user.IsAdmin
                favouriteAnimals = user.FavouriteAnimals?.Select(a => a.AnimalID).ToList(),
                savedEvents = user.SavedEvents?.Select(e => e.EventID).ToList()
            });
        }

        // DELETE: api/UsersAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Adding/Removing Animals/Events
        // Add a favourite animal
        [HttpPost("{userId}/favouriteAnimals/{animalId}")]
        public async Task<IActionResult> AddFavouriteAnimal(int userId, int animalId)
        {
            var user = await _context.User
                .Include(u => u.FavouriteAnimals)
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null) return NotFound("User not found");

            var animal = await _context.Animal.FindAsync(animalId);
            if (animal == null) return NotFound("Animal not found");

            if (!user.FavouriteAnimals.Contains(animal))
            {
                user.FavouriteAnimals.Add(animal);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        // Remove a favourite animal
        [HttpDelete("{userId}/favouriteAnimals/{animalId}")]
        public async Task<IActionResult> RemoveFavouriteAnimal(int userId, int animalId)
        {
            var user = await _context.User
                .Include(u => u.FavouriteAnimals)
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null) return NotFound("User not found");

            var animal = user.FavouriteAnimals.FirstOrDefault(a => a.AnimalID == animalId);
            if (animal != null)
            {
                user.FavouriteAnimals.Remove(animal);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        // Add a saved event
        [HttpPost("{userId}/savedEvents/{eventId}")]
        public async Task<IActionResult> AddSavedEvent(int userId, int eventId)
        {
            var user = await _context.User
                .Include(u => u.SavedEvents)
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null) return NotFound("User not found");

            var evt = await _context.Event.FindAsync(eventId);
            if (evt == null) return NotFound("Event not found");

            if (!user.SavedEvents.Contains(evt))
            {
                user.SavedEvents.Add(evt);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        // Remove a saved event
        [HttpDelete("{userId}/savedEvents/{eventId}")]
        public async Task<IActionResult> RemoveSavedEvent(int userId, int eventId)
        {
            var user = await _context.User
                .Include(u => u.SavedEvents)
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null) return NotFound("User not found");

            var evt = user.SavedEvents.FirstOrDefault(e => e.EventID == eventId);
            if (evt != null)
            {
                user.SavedEvents.Remove(evt);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }


        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserID == id);
        }
    }
}
