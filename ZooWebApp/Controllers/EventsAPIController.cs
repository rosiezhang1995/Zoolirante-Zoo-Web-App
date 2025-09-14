using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooWebApp.Data;
using ZooWebApp.Models;

namespace ZooWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsAPIController : ControllerBase
    {
        private readonly ZooWebAppContext _context;

        public EventsAPIController(ZooWebAppContext context)
        {
            _context = context;
        }

        // GET: api/EventsAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvent()
        {
            var events = await _context.Event
            .Include(e => e.Animals)
            .OrderBy(e => e.EventID)
            .Select(e => new
            {
                EventID = e.EventID,
                Title = e.Title,
                Description = e.Description,
                EventDate = e.EventDate,
                EventTime = e.EventTime,
                EventImage = e.EventImage,
                Location = e.Location,
                Animals = e.Animals.Select(a => new
                {
                    AnimalId = a.AnimalID,
                    AnimalName = a.AnimalName,
                    Description = a.Description,
                    AnimalAge = a.AnimalAge,
                    Species = a.Species,
                    Gender = a.Gender,
                    AnimalImage = a.AnimalImage,
                    Weight = a.Weight,
                    DateOfArrival = a.DateOfArrival,
                    MapImage = a.MapImage
                    
                }).ToList()
            })
            .ToListAsync();

                return Ok(events);
        }

        // GET: api/EventsAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Event.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/EventsAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.EventID)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/EventsAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.Event.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.EventID }, @event);
        }

        // DELETE: api/EventsAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Event.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Event.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Event.Any(e => e.EventID == id);
        }
    }
}
