using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZooWebApp.Migrations
{
    /// <inheritdoc />
    public partial class animalDescriptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AnimalName",
                table: "Animal",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Animal",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 1,
                column: "Description",
                value: "Leo is a strong and majestic lion, known for his striking mane and commanding presence. He enjoys lounging in the sun and observing the other animals in the zoo.");

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 2,
                column: "Description",
                value: "Joey is an energetic young kangaroo who loves to hop around and explore her enclosure. She is very curious and often interacts playfully with visitors.");

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 3,
                column: "Description",
                value: "Rajah is a powerful tiger with a vivid orange coat and distinctive black stripes. He enjoys stalking through the foliage and is known for his calm but alert demeanor.");

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 4,
                column: "Description",
                value: "Grace is a tall and graceful giraffe who loves nibbling on the tallest leaves. She is gentle and often seen walking slowly around her enclosure, captivating visitors with her height.");

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 5,
                column: "Description",
                value: "Stripes is a lively zebra known for his bold black-and-white pattern. He enjoys running around his enclosure and often plays with other zebras.");

            migrationBuilder.UpdateData(
                table: "Animal",
                keyColumn: "AnimalID",
                keyValue: 6,
                column: "Description",
                value: "Echo is a small but energetic bat who is most active during the evening. She uses echolocation to navigate and loves exploring every nook of her habitat.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Animal");

            migrationBuilder.AlterColumn<string>(
                name: "AnimalName",
                table: "Animal",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);
        }
    }
}
