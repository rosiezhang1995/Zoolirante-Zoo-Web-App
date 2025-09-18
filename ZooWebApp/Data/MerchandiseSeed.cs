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

			var merchandise = new List<Merchandise>();

			context.Merchandise.AddRange(merchandise);
			context.SaveChanges();
		}
	}
}
