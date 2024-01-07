using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class UniqueBookVotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookVote_MeetingId",
                table: "BookVote");

            migrationBuilder.CreateIndex(
                name: "IX_BookVote_MeetingId_MemberEmail_BookId",
                table: "BookVote",
                columns: new[] { "MeetingId", "MemberEmail", "BookId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookVote_MeetingId_MemberEmail_BookId",
                table: "BookVote");

            migrationBuilder.CreateIndex(
                name: "IX_BookVote_MeetingId",
                table: "BookVote",
                column: "MeetingId");
        }
    }
}
