using ZooWebApp.Models;

namespace ZooWebApp.Data
{
    public class EventSeed
    {
        public static void Seed(ZooWebAppContext context)
        {
            // Only seed events if they don't already exist
            if (!context.Event.Any())
            {
                // Query existing animals
                var kangarooJoey = context.Animal.FirstOrDefault(a => a.AnimalName == "Joey");
                var lionLeo = context.Animal.FirstOrDefault(a => a.AnimalName == "Leo");
                var tigerShira = context.Animal.FirstOrDefault(a => a.AnimalName == "Shira");
                var giraffeGrace = context.Animal.FirstOrDefault(a => a.AnimalName == "Grace");
                var zebraStripes = context.Animal.FirstOrDefault(a => a.AnimalName == "Stripes");
                var bearBrown = context.Animal.FirstOrDefault(a => a.AnimalName == "Brown");
                var batEcho = context.Animal.FirstOrDefault(a => a.AnimalName == "Echo");
                var hippoBubbles = context.Animal.FirstOrDefault(a => a.AnimalName == "Bubbles");
                var monkeyGeorge = context.Animal.FirstOrDefault(a => a.AnimalName == "George");
                var orangutanAmber = context.Animal.FirstOrDefault(a => a.AnimalName == "Amber");
                var crocidileSnap = context.Animal.FirstOrDefault(a => a.AnimalName == "Snap");
                var rhinoTank = context.Animal.FirstOrDefault(a => a.AnimalName == "Tank");
                var capybaraCapy = context.Animal.FirstOrDefault(a => a.AnimalName == "Capy");
                var beaverChewy = context.Animal.FirstOrDefault(a => a.AnimalName == "Chewy");
                var gorillaKong = context.Animal.FirstOrDefault(a => a.AnimalName == "Kong");
                var penguinPebble = context.Animal.FirstOrDefault(a => a.AnimalName == "Pebble");
                var lemurJulian = context.Animal.FirstOrDefault(a => a.AnimalName == "Julian");

                // Create new events
                var events = new List<Event>
                {
                    new Event
                    {
                        Title = "Morning Safari Parade",
                        Description = "Join our animals for a fun morning parade across the zoo!",
                        EventDate = new DateTime(2025, 9, 15),
                        EventTime = new TimeOnly(9, 30),
                        EventImage = "",
                        Location = "Main Plaza",
                        Animals = new List<Animal> { lionLeo, tigerShira, giraffeGrace }
                    },
                    new Event
                    {
                        Title = "Kangaroo Interaction Hour",
                        Description = "Get up close with our kangaroos and learn about their habitat.",
                        EventDate = new DateTime(2025, 9, 16),
                        EventTime = new TimeOnly(11, 0),
                        EventImage = "",
                        Location = "Kangaroo Exhibit",
                        Animals = new List<Animal> { kangarooJoey }
                    },
                    new Event
                    {
                        Title = "Penguin Feeding Fun",
                        Description = "Watch the penguins get fed and learn about their diet and care.",
                        EventDate = new DateTime(2025, 9, 17),
                        EventTime = new TimeOnly(14, 0),
                        EventImage = "",
                        Location = "Penguin Pool",
                        Animals = new List<Animal> { penguinPebble }
                    },
                    new Event
                    {
                        Title = "Primate Playtime",
                        Description = "See our primates swing, climb, and interact with enrichment activities.",
                        EventDate = new DateTime(2025, 9, 18),
                        EventTime = new TimeOnly(13, 30),
                        EventImage = "",
                        Location = "Primate Zone",
                        Animals = new List<Animal> { monkeyGeorge, orangutanAmber, lemurJulian }
                    },
                    new Event
                    {
                        Title = "Aquatic Giants Showcase",
                        Description = "Meet the hippos and crocodiles up close during this educational event.",
                        EventDate = new DateTime(2025, 9, 19),
                        EventTime = new TimeOnly(10, 30),
                        EventImage = "",
                        Location = "Water Exhibit",
                        Animals = new List<Animal> { hippoBubbles, crocidileSnap }
                    },
                    new Event
                    {
                        Title = "Zoo Friends Meet & Greet",
                        Description = "A fun afternoon interacting with a variety of animals from across the zoo.",
                        EventDate = new DateTime(2025, 9, 20),
                        EventTime = new TimeOnly(15, 0),
                        EventImage = "",
                        Location = "Central Courtyard",
                        Animals = new List<Animal> { bearBrown, zebraStripes, capybaraCapy, beaverChewy, gorillaKong }
                    }
                };
                context.Event.AddRange(events);
                context.SaveChanges();
            }
        }
    }
}
