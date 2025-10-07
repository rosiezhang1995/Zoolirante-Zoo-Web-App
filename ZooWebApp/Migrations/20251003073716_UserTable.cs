using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZooWebApp.Migrations
{
    /// <inheritdoc />
    public partial class UserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Event",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Animal",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    IsMember = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Event_UserID",
                table: "Event",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Animal_UserID",
                table: "Animal",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Animal_User_UserID",
                table: "Animal",
                column: "UserID",
                principalTable: "User",
                principalColumn: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_User_UserID",
                table: "Event",
                column: "UserID",
                principalTable: "User",
                principalColumn: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Animal_User_UserID",
                table: "Animal");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_User_UserID",
                table: "Event");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropIndex(
                name: "IX_Event_UserID",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Animal_UserID",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Animal");
        }
    }
}
