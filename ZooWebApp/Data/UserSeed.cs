using ZooWebApp.Models;
using ZooWebApp.Helpers;

namespace ZooWebApp.Data
{
    public class UserSeed
    {
        public static void Seed(ZooWebAppContext context)
        {
            // Check if Users already exist
            if (context.User.Any())
            {
                return;
            }
            var users = new List<User>
            {
                new User
                {
                    Username = "john",
                    PasswordHash = PasswordHelper.HashPassword("1234"),
                    FullName = "John Doe",
                    Address = "123 Main Street, Springfield",
                    Phone = "0412345678",
                    Email = "john.doe@example.com",
                    IsAdmin = false,
                    IsMember = false
                },
                new User
                {
                    Username = "jane",
                    PasswordHash = PasswordHelper.HashPassword("1234"),
                    FullName = "Jane Smith",
                    Address = "456 Park Lane, Rivertown",
                    Phone = "0498765432",
                    Email = "jane.smith@example.com",
                    IsAdmin = false,
                    IsMember = true
                },
                new User
                {
                    Username = "admin",
                    PasswordHash = PasswordHelper.HashPassword("1234"),
                    FullName = "Zoo Administrator",
                    Address = "1 Zoo Headquarters, Capital City",
                    Phone = "0400000000",
                    Email = "admin@zoo.com",
                    IsAdmin = true,
                    IsMember = false
                }
            };
            context.User.AddRange(users);
            context.SaveChanges();
        }
    }
}
