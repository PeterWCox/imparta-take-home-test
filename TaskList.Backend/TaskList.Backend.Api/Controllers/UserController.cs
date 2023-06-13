using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskList.Backend.Api.Authentication;

namespace TaskList.Backend.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;


    public UserController(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration
    )
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    // GET: api/User
    [HttpGet]
    public async Task<IActionResult> GetUserByBearerToken()
    {
        try
        {
            // Check if there is a bearer token in the request
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Unauthorized();
            }


            //Get bearer token from Headers as a string 
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            //Verify token
            var user = await GetUserFromToken(token);
            if (user is null)
            {
                return Unauthorized();
            }

            //Return the user
            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email
            });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response
            {
                Status = "Error",
                Message = e.Message
            });
        }
    }

    // GET: api/Users
    [HttpGet("All")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            // Check if there is a bearer token in the request
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Unauthorized();
            }


            //Get bearer token from Headers as a string 
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            //Verify token
            var user = await GetUserFromToken(token);
            if (user is null)
            {
                return Unauthorized();
            }

            var users = _userManager.Users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email
            });

            //Return the user
            return Ok(users);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response
            {
                Status = "Error",
                Message = e.Message
            });
        }
    }





    public async Task<JwtSecurityToken> GetToken(ApplicationUser user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };


        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return token;
    }

    public async Task<ApplicationUser> GetUserFromToken(string token)
    {
        // Decode token to get the claims
        var handler = new JwtSecurityTokenHandler();
        var decodedToken = handler.ReadJwtToken(token);
        if (decodedToken == null)
        {
            return null;
        }

        //Get the email claim
        var claims = decodedToken.Claims.ToList();
        var name = claims[0].Value;
        var user = await _userManager.FindByNameAsync(name);
        return user;
    }


}
