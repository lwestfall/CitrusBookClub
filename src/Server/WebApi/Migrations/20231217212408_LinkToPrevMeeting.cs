using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class LinkToPrevMeeting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PreviousMeetingId",
                table: "Meeting",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_PreviousMeetingId",
                table: "Meeting",
                column: "PreviousMeetingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Meeting_PreviousMeetingId",
                table: "Meeting",
                column: "PreviousMeetingId",
                principalTable: "Meeting",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Meeting_PreviousMeetingId",
                table: "Meeting");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_PreviousMeetingId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "PreviousMeetingId",
                table: "Meeting");
        }
    }
}
