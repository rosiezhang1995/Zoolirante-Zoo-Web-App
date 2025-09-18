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
    public class MerchandiseAPIController : ControllerBase
    {
        private readonly ZooWebAppContext _context;

        public MerchandiseAPIController(ZooWebAppContext context)
        {
            _context = context;
        }

        // GET: api/MerchandiseAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Merchandise>>> GetMerchandise()
        {
            return await _context.Merchandise.ToListAsync();
        }

        // GET: api/MerchandiseAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Merchandise>> GetMerchandise(int id)
        {
            var merchandise = await _context.Merchandise.FindAsync(id);

            if (merchandise == null)
            {
                return NotFound();
            }

            return merchandise;
        }

        // PUT: api/MerchandiseAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMerchandise(int id, Merchandise merchandise)
        {
            if (id != merchandise.MerchandiseID)
            {
                return BadRequest();
            }

            _context.Entry(merchandise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MerchandiseExists(id))
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

        // POST: api/MerchandiseAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Merchandise>> PostMerchandise(Merchandise merchandise)
        {
            _context.Merchandise.Add(merchandise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMerchandise", new { id = merchandise.MerchandiseID }, merchandise);
        }

        // DELETE: api/MerchandiseAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMerchandise(int id)
        {
            var merchandise = await _context.Merchandise.FindAsync(id);
            if (merchandise == null)
            {
                return NotFound();
            }

            _context.Merchandise.Remove(merchandise);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MerchandiseExists(int id)
        {
            return _context.Merchandise.Any(e => e.MerchandiseID == id);
        }
    }
}
