using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class BookImprovements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Isbn",
                table: "Book",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PageCount",
                table: "Book",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailLink",
                table: "Book",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Book",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Book_UserEmail",
                table: "Book",
                column: "UserEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_User_UserEmail",
                table: "Book",
                column: "UserEmail",
                principalTable: "User",
                principalColumn: "EmailAddress",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_User_UserEmail",
                table: "Book");

            migrationBuilder.DropIndex(
                name: "IX_Book_UserEmail",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Isbn",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "PageCount",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "ThumbnailLink",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Book");
        }
    }
}
