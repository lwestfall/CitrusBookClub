using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class MeetingUserState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MeetingUserState",
                columns: table => new
                {
                    MeetingId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserEmailAddress = table.Column<string>(type: "character varying(256)", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false, defaultValue: "Joined")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeetingUserState", x => new { x.MeetingId, x.UserEmailAddress });
                    table.ForeignKey(
                        name: "FK_MeetingUserState_Meeting_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meeting",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MeetingUserState_User_UserEmailAddress",
                        column: x => x.UserEmailAddress,
                        principalTable: "User",
                        principalColumn: "EmailAddress",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeetingUserState_UserEmailAddress",
                table: "MeetingUserState",
                column: "UserEmailAddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeetingUserState");
        }
    }
}
