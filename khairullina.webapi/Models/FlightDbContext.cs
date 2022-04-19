using Microsoft.EntityFrameworkCore;

namespace khairullina.webapi.Models
{
    public class FlightDbContext:DbContext
    {
        public DbSet<Flight> _dbcontext { get; set; }
        public FlightDbContext(DbContextOptions<FlightDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
