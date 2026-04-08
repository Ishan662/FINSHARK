using System.Security.Claims;

namespace api.Extensions
{
    public static class ClaimsExtension
    {
        public static string? GetUsername(this ClaimsPrincipal user)
        {
            if (user == null)
                return null;

            var claim = user.Claims
                .FirstOrDefault(x => x.Type == ClaimTypes.Name);

            return claim?.Value;
        }
    }
}