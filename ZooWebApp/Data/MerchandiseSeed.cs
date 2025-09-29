using ZooWebApp.Models;

namespace ZooWebApp.Data
{
	public static class MerchandiseSeed
	{
		public static void Seed(ZooWebAppContext context)
		{
			// Check if merchandise already exists
			if (context.Merchandise.Any())
			{
				return;
			}

            var merchandise = new List<Merchandise>
            {
                new Merchandise
                {
                    MerchandiseName = "Kangaroo Plush",
                    Description = "A soft and cuddly kangaroo plush toy, perfect for kids and as a souvenir.",
                    Price = 24.99m,
                    Avaliable = true,
                    MerchandiseImage = "/images/merchandise/kangaroo_plush.png",
                    Size = "Medium"
                },
                new Merchandise
                {
                    MerchandiseName = "Zoo T-Shirt",
                    Description = "A comfortable cotton t-shirt with the zoo logo printed on the front.",
                    Price = 19.99m,
                    Avaliable = true,
                    MerchandiseImage = "/images/merchandise/zoo_tshirt.png",
                    Size = "Large"
                },
                new Merchandise
                {
                    MerchandiseName = "Water Bottle",
                    Description = "Reusable stainless steel water bottle with zoo branding.",
                    Price = 14.50m,
                    Avaliable = true,
                    MerchandiseImage = "/images/merchandise/zoo_bottle.png",
                    Size = null
                },
                new Merchandise
                {
                    MerchandiseName = "Lion Keychain",
                    Description = "A small lion keychain to carry the king of the jungle with you everywhere.",
                    Price = 5.00m,
                    Avaliable = false,
                    MerchandiseImage = "/images/merchandise/lion_keychain.png",
                    Size = null
                },
                new Merchandise
                {
                    MerchandiseName = "Zoo Hoodie",
                    Description = "Warm and cozy hoodie with kangaroo pouch pockets and zoo branding.",
                    Price = 39.99m,
                    Avaliable = true,
                    MerchandiseImage = "/images/merchandise/zoo_hoodie.png",
                    Size = "XL"
                }

            };

            context.Merchandise.AddRange(merchandise);
			context.SaveChanges();
		}
	}
}
