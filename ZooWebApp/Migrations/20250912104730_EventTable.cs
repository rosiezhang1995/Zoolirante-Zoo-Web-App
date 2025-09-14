using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZooWebApp.Migrations
{
    /// <inheritdoc />
    public partial class EventTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    EventID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    EventDate = table.Column<DateTime>(type: "Date", nullable: false),
                    EventTime = table.Column<TimeOnly>(type: "Time", nullable: false),
                    EventImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.EventID);
                });

            migrationBuilder.CreateTable(
                name: "AnimalEvent",
                columns: table => new
                {
                    AnimalsAnimalID = table.Column<int>(type: "int", nullable: false),
                    EventsEventID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalEvent", x => new { x.AnimalsAnimalID, x.EventsEventID });
                    table.ForeignKey(
                        name: "FK_AnimalEvent_Animal_AnimalsAnimalID",
                        column: x => x.AnimalsAnimalID,
                        principalTable: "Animal",
                        principalColumn: "AnimalID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnimalEvent_Event_EventsEventID",
                        column: x => x.EventsEventID,
                        principalTable: "Event",
                        principalColumn: "EventID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimalEvent_EventsEventID",
                table: "AnimalEvent",
                column: "EventsEventID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimalEvent");

            migrationBuilder.DropTable(
                name: "Event");
        }
    }
}
