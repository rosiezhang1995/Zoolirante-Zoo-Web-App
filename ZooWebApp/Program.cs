using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZooWebApp.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ZooWebAppContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ZooWebAppContext") ?? throw new InvalidOperationException("Connection string 'ZooWebAppContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Seeding tables
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ZooWebAppContext>();

    // Apply migrations
    context.Database.Migrate();

    // Seed each table individually
    AnimalSeed.Seed(context);
    EventSeed.Seed(context);
	MerchandiseSeed.Seed(context);
    UserSeed.Seed(context);
}

app.Run();
