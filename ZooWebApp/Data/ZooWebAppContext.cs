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

        public DbSet<ZooWebApp.Models.Animal> Animal { get; set; } = default!;
        public DbSet<ZooWebApp.Models.EventAnimal> EventAnimal { get; set; } = default!;
        public DbSet<ZooWebApp.Models.Event> Event { get; set; } = default!;

    }
}
