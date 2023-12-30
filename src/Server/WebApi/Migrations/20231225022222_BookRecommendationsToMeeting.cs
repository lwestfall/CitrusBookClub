using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class BookRecommendationsToMeeting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BookRecommendation_MeetingId",
                table: "BookRecommendation",
                column: "MeetingId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookRecommendation_Meeting_MeetingId",
                table: "BookRecommendation",
                column: "MeetingId",
                principalTable: "Meeting",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookRecommendation_Meeting_MeetingId",
                table: "BookRecommendation");

            migrationBuilder.DropIndex(
                name: "IX_BookRecommendation_MeetingId",
                table: "BookRecommendation");
        }
    }
}
