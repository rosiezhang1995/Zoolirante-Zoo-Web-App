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
                    AnimalName = "Joey",
                    AnimalAge = 1,
                    Species = "Red Kangaroo",
                    Gender = "M",
                    AnimalImage = "/images/animals/Joey.png",
                    Weight = 11.00m,
                    DateOfArrival = new DateTime(2024, 3, 14),
                    MapImage = "/images/maps/KangarooMap.png",
                    Description = "Joey is a playful red kangaroo who loves hopping around his enclosure. As an Australian native, he represents the perfect bridge between Italian heritage and Australian wildlife."
                },
                new Animal
                {
                    AnimalName = "Leo",
                    AnimalAge = 7,
                    Species = "Lion",
                    Gender = "M",
                    AnimalImage = "/images/animals/Leo.png",
                    Weight = 190.00m,
                    DateOfArrival = new DateTime(2019, 5, 20),
                    MapImage = "/images/maps/LionMap.png",
                    Description = "Leo is a majestic African lion and the king of our savanna. He's known for his impressive mane and confident demeanor. Leo loves basking in the Australian sun and is a favorite among visitors."
                },
                new Animal
                {
                    AnimalName = "Shira",
                    AnimalAge = 5,
                    Species = "Tiger",
                    Gender = "F",
                    AnimalImage = "/images/animals/Shira.png",
                    Weight = 160.00m,
                    DateOfArrival = new DateTime(2021, 7, 11),
                    MapImage = "/images/maps/TigerMap.png",
                    Description = "Shira is an agile tigress who enjoys swimming and stalking her toys."
                },
                new Animal
                {
                    AnimalName = "Grace",
                    AnimalAge = 8,
                    Species = "Masai Giraffe",
                    Gender = "F",
                    AnimalImage = "/images/animals/Grace.png",
                    Weight = 850.00m,
                    DateOfArrival = new DateTime(2018, 11, 3),
                    MapImage = "/images/maps/GiraffeMap.png",
                    Description = "Grace is an elegant Masai giraffe who towers gracefully above all other animals. Her gentle nature and curiosity make her perfect for educational programs about African wildlife."
                },
                new Animal
                {
                    AnimalName = "Stripes",
                    AnimalAge = 6,
                    Species = "Zebra",
                    Gender = "F",
                    AnimalImage = "/images/animals/Stripes.png",
                    Weight = 320.00m,
                    DateOfArrival = new DateTime(2020, 9, 15),
                    MapImage = "/images/maps/GiraffeMap.png",
                    Description = "Stripes is a lively zebra with bold markings and a playful spirit."
                },
                new Animal
                {
                    AnimalName = "Brown",
                    AnimalAge = 9,
                    Species = "Marsican Brown Bear",
                    Gender = "M",
                    AnimalImage = "/images/animals/Brown.png",
                    Weight = 290.00m,
                    DateOfArrival = new DateTime(2019, 6, 12),
                    MapImage = "/images/maps/BearMap.png",
                    Description = "Brown is a rare Marsican brown bear, representing the pride of Italian wildlife. As one of the most endangered bears in the world, he symbolizes Zoolirante's commitment to conservation and our Italian heritage."
                },
                new Animal
                {
                    AnimalName = "Echo",
                    AnimalAge = 4,
                    Species = "Bat",
                    Gender = "M",
                    AnimalImage = "/images/animals/Echo.png",
                    Weight = 1.20m,
                    DateOfArrival = new DateTime(2022, 4, 19),
                    MapImage = "/images/maps/BatMap.png",
                    Description = "Echo is a curious bat who spends most of the day hanging upside down."
                },
                new Animal
                {
                    AnimalName = "Bubbles",
                    AnimalAge = 12,
                    Species = "Hippo",
                    Gender = "F",
                    AnimalImage = "/images/animals/Bubbles.png",
                    Weight = 1500.00m,
                    DateOfArrival = new DateTime(2017, 2, 22),
                    MapImage = "/images/maps/HippoMap.png",
                    Description = "Bubbles is a hippo who loves wallowing in the water."
                },
                new Animal
                {
                    AnimalName = "George",
                    AnimalAge = 5,
                    Species = "Monkey",
                    Gender = "M",
                    AnimalImage = "/images/animals/George.png",
                    Weight = 14.00m,
                    DateOfArrival = new DateTime(2021, 1, 10),
                    MapImage = "/images/maps/MonkeyMap.png",
                    Description = "George is an energetic monkey who is always up to mischief."
                },
                new Animal
                {
                    AnimalName = "Amber",
                    AnimalAge = 7,
                    Species = "Orangutan",
                    Gender = "F",
                    AnimalImage = "/images/animals/Amber.png",
                    Weight = 70.00m,
                    DateOfArrival = new DateTime(2019, 8, 8),
                    MapImage = "/images/maps/GorillaMap.png",
                    Description = "Amber is a thoughtful orangutan who enjoys solving puzzles."
                },
                new Animal
                {
                    AnimalName = "Snap",
                    AnimalAge = 15,
                    Species = "Crocodile",
                    Gender = "M",
                    AnimalImage = "/images/animals/Snap.png",
                    Weight = 500.00m,
                    DateOfArrival = new DateTime(2018, 10, 11),
                    MapImage = "/images/maps/AlligatorMap.png",
                    Description = "Snap is a powerful crocodile who enjoys basking on the riverbank."
                },
                new Animal
                {
                    AnimalName = "Tank",
                    AnimalAge = 11,
                    Species = "Rhino",
                    Gender = "M",
                    AnimalImage = "/images/animals/Tank.png",
                    Weight = 2100.00m,
                    DateOfArrival = new DateTime(2021, 2, 5),
                    MapImage = "/images/maps/GiraffeMap.png",
                    Description = "Tank is a strong rhino with a calm demeanor, known for his large horn."
                },
                new Animal
                {
                    AnimalName = "Capy",
                    AnimalAge = 5,
                    Species = "Capybara",
                    Gender = "F",
                    AnimalImage = "/images/animals/Capy.png",
                    Weight = 55.20m,
                    DateOfArrival = new DateTime(2022, 4, 16),
                    MapImage = "/images/maps/CapybaraMap.png",
                    Description = "Capy is a social capybara who enjoys lounging by the water."
                },
                new Animal
                {
                    AnimalName = "Chewy",
                    AnimalAge = 7,
                    Species = "Beaver",
                    Gender = "M",
                    AnimalImage = "/images/animals/Chewy.png",
                    Weight = 28.40m,
                    DateOfArrival = new DateTime(2021, 7, 3),
                    MapImage = "/images/maps/BeaverMap.png",
                    Description = "Chewy is a busy beaver who spends hours building and repairing his lodge."
                },
                new Animal
                {
                    AnimalName = "Kong",
                    AnimalAge = 13,
                    Species = "Gorilla",
                    Gender = "M",
                    AnimalImage = "/images/animals/Kong.png",
                    Weight = 180.00m,
                    DateOfArrival = new DateTime(2019, 9, 9),
                    MapImage = "/images/maps/GorillaMap.png",
                    Description = "Kong is a mighty gorilla with a gentle heart, often seen protecting his group."
                },
                new Animal
                {
                    AnimalName = "Pebble",
                    AnimalAge = 2,
                    Species = "Penguin",
                    Gender = "F",
                    AnimalImage = "/images/animals/Pebble.png",
                    Weight = 8.30m,
                    DateOfArrival = new DateTime(2023, 12, 5),
                    MapImage = "/images/maps/PenguinMap.png",
                    Description = "Pebble is a young penguin who loves sliding across the ice."
                },
                new Animal
                {
                    AnimalName = "Julian",
                    AnimalAge = 6,
                    Species = "Lemur",
                    Gender = "M",
                    AnimalImage = "/images/animals/Julian.png",
                    Weight = 9.50m,
                    DateOfArrival = new DateTime(2022, 11, 7),
                    MapImage = "/images/maps/LemurMap.png",
                    Description = "Julian is a lively lemur who enjoys leaping from tree to tree."
                }

            };

            context.Animal.AddRange(animals);
            context.SaveChanges();
        }
    }
}
