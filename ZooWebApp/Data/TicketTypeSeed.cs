using ZooWebApp.Models;

namespace ZooWebApp.Data
{
    public class TicketTypeSeed
    {
        public static void Seed(ZooWebAppContext context)
        {
            if (!context.TicketTypes.Any())
            {
                var ticketTypes = new List<TicketType>
                {
                    new TicketType
                    {
                        TypeName = "Adult",
                        Description = "Ages 15 and above",
                        Price = 45.00m,
                        IsActive = true,
                        MaxQuantityPerBooking = 10
                    },
                    new TicketType
                    {
                        TypeName = "Child",
                        Description = "Ages 4-14",
                        Price = 25.00m,
                        IsActive = true,
                        MaxQuantityPerBooking = 10
                    },
                    new TicketType
                    {
                        TypeName = "Consession",
                        Description = "Valid Senior Card or Student Card required",
                        Price = 35.00m,
                        IsActive = true,
                        MaxQuantityPerBooking = 10
                    },
                    new TicketType
                    {
                        TypeName = "Family Pass",
                        Description = "2 Adults + 2 Children",
                        Price = 120.00m,
                        IsActive = true,
                        MaxQuantityPerBooking = 5
                    }
                };

                context.TicketTypes.AddRange(ticketTypes);
                context.SaveChanges();
            }
        }
    }
}