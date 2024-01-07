using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameMeetingState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "Meeting",
                newName: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Meeting",
                newName: "State");
        }
    }
}
