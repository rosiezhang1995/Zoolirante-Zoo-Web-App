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
                new Animal
                {
                    AnimalID = 1,
                    AnimalName = "Leo",
                    AnimalAge = 5,
                    Species = "Lion",
                    Gender = "M",
                    AnimalImage = "images/animals/leo.png",
                    Weight = 190.50m,
                    DateOfArrival = new DateTime(2023, 7, 15),
                    MapImage = "xxxx"
                },
                new Animal
                {
                    AnimalID = 2,
                    AnimalName = "Joey",
                    AnimalAge = 3,
                    Species = "Kangaroo",
                    Gender = "F",
                    AnimalImage = "images/animals/joey.png",
                    Weight = 85.75m,
                    DateOfArrival = new DateTime(2024, 3, 10),
                    MapImage = "xxxx"
                },
                new Animal
                {
                    AnimalID = 3,
                    AnimalName = "Rajah",
                    AnimalAge = 7,
                    Species = "Tiger",
                    Gender = "M",
                    AnimalImage = "images/animals/rajah.png",
                    Weight = 220.30m,
                    DateOfArrival = new DateTime(2022, 11, 5),
                    MapImage = "xxxx"
                },
                new Animal
                {
                    AnimalID = 4,
                    AnimalName = "Grace",
                    AnimalAge = 12,
                    Species = "Giraffe",
                    Gender = "F",
                    AnimalImage = "images/animals/grace.png",
                    Weight = 800.40m,
                    DateOfArrival = new DateTime(2021, 6, 2),
                    MapImage = "xxxx"
                },
                new Animal
                {
                    AnimalID = 5,
                    AnimalName = "Stripes",
                    AnimalAge = 6,
                    Species = "Zebra",
                    Gender = "M",
                    AnimalImage = "images/animals/stripes.png",
                    Weight = 380.90m,
                    DateOfArrival = new DateTime(2023, 2, 20),
                    MapImage = "xxxx"
                },
                new Animal
                {
                    AnimalID = 6,
                    AnimalName = "Echo",
                    AnimalAge = 2,
                    Species = "Bat",
                    Gender = "F",
                    AnimalImage = "images/animals/echo.png",
                    Weight = 1.25m,
                    DateOfArrival = new DateTime(2024, 1, 14),
                    MapImage = "xxxx"
                }

            );
        }
        public DbSet<ZooWebApp.Models.Animal> Animal { get; set; } = default!;
    }
}
