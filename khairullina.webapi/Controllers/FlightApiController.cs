using khairullina.webapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace khairullina.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightApiController : Controller
    {
        // GET: ElectronicModelController
        private FlightDbContext? _flightDB;
        public FlightApiController(FlightDbContext _context)
        {
            _flightDB = _context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> Get()
        {
            return await _flightDB._dbcontext.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> Get(int id)
        {
            Flight model =
                await _flightDB._dbcontext.FirstOrDefaultAsync(x => x.id == id);
            if (model == null)
                return NotFound();
            return model;
        }

        [HttpPost]
        public async Task<ActionResult<Flight>> Post(Flight flight)
        {
            if (flight == null)
                return BadRequest();
            _flightDB._dbcontext.Add(flight);
            await _flightDB.SaveChangesAsync();
            return Ok(flight);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Flight>> Put(Flight flight)
        {
            if (flight == null)
                return BadRequest();
            if (!_flightDB._dbcontext.Any(x => x.id == flight.id))
            {
                return NotFound();
            }
            _flightDB._dbcontext.Update(flight);
            await _flightDB.SaveChangesAsync();
            return Ok(flight);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Flight>> Delete(int id)
        {
            Flight flight =
                await _flightDB._dbcontext.FirstOrDefaultAsync(x => x.id == id);
            if (flight == null)
                return NotFound();
            _flightDB._dbcontext.Remove(flight);
            await _flightDB.SaveChangesAsync();
            return Ok(flight);
        }
    }
}
