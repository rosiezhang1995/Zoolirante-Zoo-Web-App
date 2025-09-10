using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ZooWebApp.Migrations
{
    /// <inheritdoc />
    public partial class animalMockDataV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 1,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Species", "Weight" },
                values: new object[] { 6, "images/animals/Jack.png", "Jack", new DateTime(2020, 3, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jack is a strong kangaroo who loves hopping around the enclosure.", "Kangaroo", 85.00m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 2,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Species", "Weight" },
                values: new object[] { 7, "images/animals/Leo.png", "Leo", new DateTime(2019, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Leo is the pride's leader with a majestic mane and a calm personality.", "M", "Lion", 190.00m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 3,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { 5, "images/animals/Shira.png", "Shira", new DateTime(2021, 7, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Shira is an agile tigress who enjoys swimming and stalking her toys.", "F", 160.00m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 4,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { 8, "images/animals/Stretch.png", "Stretch", new DateTime(2018, 11, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Stretch is a tall giraffe who loves reaching for the highest leaves.", "M", 850.00m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 5,
                columns: new[] { "AnimalImage", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { "images/animals/Stripes.png", new DateTime(2020, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Stripes is a lively zebra with bold markings and a playful spirit.", "F", 320.00m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 6,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Species", "Weight" },
                values: new object[] { 9, "images/animals/Sonya.png", "Sonya", new DateTime(2019, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sonya is a gentle bear who loves honey and naps by the trees.", "Bear", 300.00m });

            migrationBuilder.InsertData(
                table: "Animal",
                columns: new[] { "AnimalID", "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "MapImage", "Species", "Weight" },
                values: new object[,]
                {
                    { 7, 4, "images/animals/Echo.png", "Echo", new DateTime(2022, 4, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Echo is a curious bat who spends most of the day hanging upside down.", "M", "xxxx", "Bat", 1.20m },
                    { 8, 12, "images/animals/Bubbles.png", "Bubbles", new DateTime(2017, 2, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bubbles is a hippo who loves wallowing in the water.", "F", "xxxx", "Hippo", 1500.00m },
                    { 9, 5, "images/animals/George.png", "George", new DateTime(2021, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "George is an energetic monkey who is always up to mischief.", "M", "xxxx", "Monkey", 14.00m },
                    { 10, 7, "images/animals/Amber.png", "Amber", new DateTime(2019, 8, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Amber is a thoughtful orangutan who enjoys solving puzzles.", "F", "xxxx", "Orangutan", 70.00m },
                    { 11, 15, "images/animals/Snap.png", "Snap", new DateTime(2018, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Snap is a powerful crocodile who enjoys basking on the riverbank.", "M", "xxxx", "Crocodile", 500.00m },
                    { 12, 14, "images/animals/Chomp.png", "Chomp", new DateTime(2019, 6, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Chomp is an alligator with a massive jaw, often spotted lurking under the water surface.", "M", "xxxx", "Alligator", 480.00m },
                    { 13, 11, "images/animals/Tank.png", "Tank", new DateTime(2021, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Tank is a strong rhino with a calm demeanor, known for his large horn.", "M", "xxxx", "Rhino", 2100.00m },
                    { 14, 5, "images/animals/Capy.png", "Capy", new DateTime(2022, 4, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "Capy is a social capybara who enjoys lounging by the water.", "F", "xxxx", "Capybara", 55.20m },
                    { 15, 7, "images/animals/Chewy.png", "Chewy", new DateTime(2021, 7, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Chewy is a busy beaver who spends hours building and repairing his lodge.", "M", "xxxx", "Beaver", 28.40m },
                    { 16, 13, "images/animals/Kong.png", "Kong", new DateTime(2019, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), "Kong is a mighty gorilla with a gentle heart, often seen protecting his group.", "M", "xxxx", "Gorilla", 180.00m },
                    { 17, 2, "images/animals/Pebble.png", "Pebble", new DateTime(2023, 12, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pebble is a young penguin who loves sliding across the ice.", "F", "xxxx", "Penguin", 8.30m },
                    { 18, 6, "images/animals/Julian.png", "Julian", new DateTime(2022, 11, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Julian is a lively lemur who enjoys leaping from tree to tree.", "M", "xxxx", "Lemur", 9.50m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 18);

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 1,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Species", "Weight" },
                values: new object[] { 5, "images/animals/leo.png", "Leo", new DateTime(2023, 7, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Leo is a strong and majestic lion, known for his striking mane and commanding presence. He enjoys lounging in the sun and observing the other animals in the zoo.", "Lion", 190.50m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 2,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Species", "Weight" },
                values: new object[] { 3, "images/animals/joey.png", "Joey", new DateTime(2024, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Joey is an energetic young kangaroo who loves to hop around and explore her enclosure. She is very curious and often interacts playfully with visitors.", "F", "Kangaroo", 85.75m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 3,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { 7, "images/animals/rajah.png", "Rajah", new DateTime(2022, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rajah is a powerful tiger with a vivid orange coat and distinctive black stripes. He enjoys stalking through the foliage and is known for his calm but alert demeanor.", "M", 220.30m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 4,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { 12, "images/animals/grace.png", "Grace", new DateTime(2021, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Grace is a tall and graceful giraffe who loves nibbling on the tallest leaves. She is gentle and often seen walking slowly around her enclosure, captivating visitors with her height.", "F", 800.40m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 5,
                columns: new[] { "AnimalImage", "DateOfArrival", "Description", "Gender", "Weight" },
                values: new object[] { "images/animals/stripes.png", new DateTime(2023, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Stripes is a lively zebra known for his bold black-and-white pattern. He enjoys running around his enclosure and often plays with other zebras.", "M", 380.90m });

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 6,
                columns: new[] { "AnimalAge", "AnimalImage", "AnimalName", "DateOfArrival", "Description", "Species", "Weight" },
                values: new object[] { 2, "images/animals/echo.png", "Echo", new DateTime(2024, 1, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Echo is a small but energetic bat who is most active during the evening. She uses echolocation to navigate and loves exploring every nook of her habitat.", "Bat", 1.25m });
        }
    }
}
