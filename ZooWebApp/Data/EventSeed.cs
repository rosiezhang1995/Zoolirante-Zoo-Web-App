using ZooWebApp.Models;

namespace ZooWebApp.Data
{
    public class EventSeed
    {
        public static void Seed(ZooWebAppContext context)
        {
            // Check if events already exist
            if (context.Event.Any())
            {
                return;
            }

            var events = new List<Event>();

            context.Event.AddRange();
            context.SaveChanges();
        }
    }
}
