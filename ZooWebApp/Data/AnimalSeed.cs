using ZooWebApp.Models;

namespace ZooWebApp.Data
{
    public static class AnimalSeed
    {
        public static void Seed(ZooWebAppContext context)
        {
            // Check if animals already exist
            if (context.Animal.Any())
            {
                return;
            }

            var animals = new List<Animal>
            {
                new Animal
                {
                    AnimalName = "Jack",
                    AnimalAge = 6,
                    Species = "Kangaroo",
                    Gender = "M",
                    AnimalImage = "images/animals/Jack.png",
                    Weight = 85.00m,
                    DateOfArrival = new DateTime(2020, 3, 14),
                    MapImage = "xxxx",
                    Description = "Jack is a strong kangaroo who loves hopping around the enclosure."
                },
                new Animal
                {
                    AnimalName = "Leo",
                    AnimalAge = 7,
                    Species = "Lion",
                    Gender = "M",
                    AnimalImage = "images/animals/Leo.png",
                    Weight = 190.00m,
                    DateOfArrival = new DateTime(2019, 5, 20),
                    MapImage = "xxxx",
                    Description = "Leo is the pride's leader with a majestic mane and a calm personality."
                },
                new Animal
                {
                    AnimalName = "Shira",
                    AnimalAge = 5,
                    Species = "Tiger",
                    Gender = "F",
                    AnimalImage = "images/animals/Shira.png",
                    Weight = 160.00m,
                    DateOfArrival = new DateTime(2021, 7, 11),
                    MapImage = "xxxx",
                    Description = "Shira is an agile tigress who enjoys swimming and stalking her toys."
                },
                new Animal
                {
                    AnimalName = "Stretch",
                    AnimalAge = 8,
                    Species = "Giraffe",
                    Gender = "M",
                    AnimalImage = "images/animals/Stretch.png",
                    Weight = 850.00m,
                    DateOfArrival = new DateTime(2018, 11, 3),
                    MapImage = "xxxx",
                    Description = "Stretch is a tall giraffe who loves reaching for the highest leaves."
                },
                new Animal
                {
                    AnimalName = "Stripes",
                    AnimalAge = 6,
                    Species = "Zebra",
                    Gender = "F",
                    AnimalImage = "images/animals/Stripes.png",
                    Weight = 320.00m,
                    DateOfArrival = new DateTime(2020, 9, 15),
                    MapImage = "xxxx",
                    Description = "Stripes is a lively zebra with bold markings and a playful spirit."
                },
                new Animal
                {
                    AnimalName = "Sonya",
                    AnimalAge = 9,
                    Species = "Bear",
                    Gender = "F",
                    AnimalImage = "images/animals/Sonya.png",
                    Weight = 300.00m,
                    DateOfArrival = new DateTime(2019, 6, 1),
                    MapImage = "xxxx",
                    Description = "Sonya is a gentle bear who loves honey and naps by the trees."
                },
                new Animal
                {
                    AnimalName = "Echo",
                    AnimalAge = 4,
                    Species = "Bat",
                    Gender = "M",
                    AnimalImage = "images/animals/Echo.png",
                    Weight = 1.20m,
                    DateOfArrival = new DateTime(2022, 4, 19),
                    MapImage = "xxxx",
                    Description = "Echo is a curious bat who spends most of the day hanging upside down."
                },
                new Animal
                {
                    AnimalName = "Bubbles",
                    AnimalAge = 12,
                    Species = "Hippo",
                    Gender = "F",
                    AnimalImage = "images/animals/Bubbles.png",
                    Weight = 1500.00m,
                    DateOfArrival = new DateTime(2017, 2, 22),
                    MapImage = "xxxx",
                    Description = "Bubbles is a hippo who loves wallowing in the water."
                },
                new Animal
                {
                    AnimalName = "George",
                    AnimalAge = 5,
                    Species = "Monkey",
                    Gender = "M",
                    AnimalImage = "images/animals/George.png",
                    Weight = 14.00m,
                    DateOfArrival = new DateTime(2021, 1, 10),
                    MapImage = "xxxx",
                    Description = "George is an energetic monkey who is always up to mischief."
                },
                new Animal
                {
                    AnimalName = "Amber",
                    AnimalAge = 7,
                    Species = "Orangutan",
                    Gender = "F",
                    AnimalImage = "images/animals/Amber.png",
                    Weight = 70.00m,
                    DateOfArrival = new DateTime(2019, 8, 8),
                    MapImage = "xxxx",
                    Description = "Amber is a thoughtful orangutan who enjoys solving puzzles."
                },
                new Animal
                {
                    AnimalName = "Snap",
                    AnimalAge = 15,
                    Species = "Crocodile",
                    Gender = "M",
                    AnimalImage = "images/animals/Snap.png",
                    Weight = 500.00m,
                    DateOfArrival = new DateTime(2018, 10, 11),
                    MapImage = "xxxx",
                    Description = "Snap is a powerful crocodile who enjoys basking on the riverbank."
                },
                new Animal
                {
                    AnimalName = "Tank",
                    AnimalAge = 11,
                    Species = "Rhino",
                    Gender = "M",
                    AnimalImage = "images/animals/Tank.png",
                    Weight = 2100.00m,
                    DateOfArrival = new DateTime(2021, 2, 5),
                    MapImage = "xxxx",
                    Description = "Tank is a strong rhino with a calm demeanor, known for his large horn."
                },
                new Animal
                {
                    AnimalName = "Capy",
                    AnimalAge = 5,
                    Species = "Capybara",
                    Gender = "F",
                    AnimalImage = "images/animals/Capy.png",
                    Weight = 55.20m,
                    DateOfArrival = new DateTime(2022, 4, 16),
                    MapImage = "xxxx",
                    Description = "Capy is a social capybara who enjoys lounging by the water."
                },
                new Animal
                {
                    AnimalName = "Chewy",
                    AnimalAge = 7,
                    Species = "Beaver",
                    Gender = "M",
                    AnimalImage = "images/animals/Chewy.png",
                    Weight = 28.40m,
                    DateOfArrival = new DateTime(2021, 7, 3),
                    MapImage = "xxxx",
                    Description = "Chewy is a busy beaver who spends hours building and repairing his lodge."
                },
                new Animal
                {
                    AnimalName = "Kong",
                    AnimalAge = 13,
                    Species = "Gorilla",
                    Gender = "M",
                    AnimalImage = "images/animals/Kong.png",
                    Weight = 180.00m,
                    DateOfArrival = new DateTime(2019, 9, 9),
                    MapImage = "xxxx",
                    Description = "Kong is a mighty gorilla with a gentle heart, often seen protecting his group."
                },
                new Animal
                {
                    AnimalName = "Pebble",
                    AnimalAge = 2,
                    Species = "Penguin",
                    Gender = "F",
                    AnimalImage = "images/animals/Pebble.png",
                    Weight = 8.30m,
                    DateOfArrival = new DateTime(2023, 12, 5),
                    MapImage = "xxxx",
                    Description = "Pebble is a young penguin who loves sliding across the ice."
                },
                new Animal
                {
                    AnimalName = "Julian",
                    AnimalAge = 6,
                    Species = "Lemur",
                    Gender = "M",
                    AnimalImage = "images/animals/Julian.png",
                    Weight = 9.50m,
                    DateOfArrival = new DateTime(2022, 11, 7),
                    MapImage = "xxxx",
                    Description = "Julian is a lively lemur who enjoys leaping from tree to tree."
                }
            };

            context.Animal.AddRange(animals);
            context.SaveChanges();
        }
    }
}
