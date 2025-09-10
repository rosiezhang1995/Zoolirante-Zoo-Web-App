using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ZooWebApp.Migrations
{
    /// <inheritdoc />
    public partial class animalMockData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Animal",
                columns: new[] { "AnimalID", "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Gender", "MapImage", "Species", "Weight" },
                values: new object[,]
                {
                    { 1, 5, "images/animals/leo.png", "Leo", new DateTime(2023, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "M", "xxxx", "Lion", 190.50m },
                    { 2, 3, "images/animals/joey.png", "Joey", new DateTime(2024, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "F", "xxxx", "Kangaroo", 85.75m },
                    { 3, 7, "images/animals/rajah.png", "Rajah", new DateTime(2022, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "M", "xxxx", "Tiger", 220.30m },
                    { 4, 12, "images/animals/grace.png", "Grace", new DateTime(2021, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "F", "xxxx", "Giraffe", 800.40m },
                    { 5, 6, "images/animals/stripes.png", "Stripes", new DateTime(2023, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "M", "xxxx", "Zebra", 380.90m },
                    { 6, 2, "images/animals/echo.png", "Echo", new DateTime(2024, 1, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "F", "xxxx", "Bat", 1.25m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 6);
        }
    }
}
