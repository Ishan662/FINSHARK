using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54a489b0-212e-49c8-b51d-2737c94ed71c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6fbfd27c-80c1-42a0-8fc5-a5d05de60f8f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "31a37dfd-7278-404c-994d-259ff734989f", "31a37dfd-7278-404c-994d-259ff734989f", "Admin", "ADMIN" },
                    { "eeb83b15-b74e-4e7c-8c9b-b26757676a90", "eeb83b15-b74e-4e7c-8c9b-b26757676a90", "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "31a37dfd-7278-404c-994d-259ff734989f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eeb83b15-b74e-4e7c-8c9b-b26757676a90");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "54a489b0-212e-49c8-b51d-2737c94ed71c", "6e63958b-8aa9-4338-b8dc-6d67ac8c5732", "Admin", "ADMIN" },
                    { "6fbfd27c-80c1-42a0-8fc5-a5d05de60f8f", "70ef84a4-1ea9-4ef0-8ddc-fea43b1cd103", "User", "USER" }
                });
        }
    }
}
