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

        public DbSet<ZooWebApp.Models.Animal> Animal { get; set; } = default!;
        public DbSet<ZooWebApp.Models.Event> Event { get; set; } = default!;
        public DbSet<ZooWebApp.Models.Merchandise> Merchandise { get; set; } = default!;
        public DbSet<ZooWebApp.Models.User> User { get; set; } = default!;


        // booking system
        public DbSet<ZooWebApp.Models.TicketType> TicketTypes { get; set; } = default!;
        public DbSet<ZooWebApp.Models.PaymentMethod> PaymentMethods { get; set; } = default!;
        public DbSet<ZooWebApp.Models.Booking> Bookings { get; set; } = default!;
        public DbSet<ZooWebApp.Models.BookingItem> BookingItems { get; set; } = default!;

        // Relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BookingItem>()
                .HasOne(bi => bi.Booking)
                .WithMany(b => b.Items)
                .HasForeignKey(bi => bi.BookingID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookingItem>()
                .HasOne(bi => bi.TicketType)
                .WithMany()
                .HasForeignKey(bi => bi.TicketTypeID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasIndex(b => b.BookingReference)
                .IsUnique();

            modelBuilder.Entity<PaymentMethod>()
                .HasOne(pm => pm.User)
                .WithMany()
                .HasForeignKey(pm => pm.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Restrict);  

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.PaymentMethod)
                .WithMany()
                .HasForeignKey(b => b.PaymentMethodID)
                .OnDelete(DeleteBehavior.Restrict); 
        }

    }
}
