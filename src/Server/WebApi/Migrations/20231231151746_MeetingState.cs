using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class MeetingState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Meeting",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "Meeting");
        }
    }
}
