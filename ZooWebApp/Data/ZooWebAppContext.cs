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
                    MapImage = "xxxx",
                    Description = "Leo is a strong and majestic lion, known for his striking mane and commanding presence. He enjoys lounging in the sun and observing the other animals in the zoo."
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
                    MapImage = "xxxx",
                    Description = "Joey is an energetic young kangaroo who loves to hop around and explore her enclosure. She is very curious and often interacts playfully with visitors."
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
                    MapImage = "xxxx",
                    Description = "Rajah is a powerful tiger with a vivid orange coat and distinctive black stripes. He enjoys stalking through the foliage and is known for his calm but alert demeanor."
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
                    MapImage = "xxxx",
                    Description = "Grace is a tall and graceful giraffe who loves nibbling on the tallest leaves. She is gentle and often seen walking slowly around her enclosure, captivating visitors with her height."
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
                    MapImage = "xxxx",
                    Description = "Stripes is a lively zebra known for his bold black-and-white pattern. He enjoys running around his enclosure and often plays with other zebras."
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
                    MapImage = "xxxx",
                    Description = "Echo is a small but energetic bat who is most active during the evening. She uses echolocation to navigate and loves exploring every nook of her habitat."
                }


            );
        }
        public DbSet<ZooWebApp.Models.Animal> Animal { get; set; } = default!;
    }
}
