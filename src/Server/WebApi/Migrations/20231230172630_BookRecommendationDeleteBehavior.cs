using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cbc.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class BookRecommendationDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookRecommendation_Book_BookId",
                table: "BookRecommendation");

            migrationBuilder.AddForeignKey(
                name: "FK_BookRecommendation_Book_BookId",
                table: "BookRecommendation",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookRecommendation_Book_BookId",
                table: "BookRecommendation");

            migrationBuilder.AddForeignKey(
                name: "FK_BookRecommendation_Book_BookId",
                table: "BookRecommendation",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
