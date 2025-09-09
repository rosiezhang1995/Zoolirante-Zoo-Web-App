using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZooWebApp.Models;

namespace ZooWebApp.Data
{
    public class ZooWebAppContext : DbContext
    {
        public ZooWebAppContext (DbContextOptions<ZooWebAppContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example of seed data
            modelBuilder.Entity<Animal>().HasData(
                
                
            );
        }
        public DbSet<ZooWebApp.Models.Animal> Animal { get; set; } = default!;
    }
}
