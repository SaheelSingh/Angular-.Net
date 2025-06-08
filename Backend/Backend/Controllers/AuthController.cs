using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            if (login.Username == "admin" && login.Password == "123")
            {
                var claims = new[]
                {
                  new Claim(ClaimTypes.Name,login.Username),
                  new Claim(ClaimTypes.Role,"Admin")
               };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKey123"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddHours(1),
                    claims: claims,
                    signingCredentials: creds
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                });

            }
            return Unauthorized();
        }
    }
}
