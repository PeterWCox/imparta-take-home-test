using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskList.Backend.Api.Authentication;
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IValidator<LoginModel> _loginValidator;


    public LoginController(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration,
        IValidator<LoginModel> loginValidator
    )
    {
        _userManager = userManager;
        _configuration = configuration;
        _loginValidator = loginValidator;
    }


    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        try
        {
            //Validate model
            var validationResult = _loginValidator.Validate(model);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "An unknown error has occured. "
                });
            }

            //Verify username and password
            ApplicationUser user = await _userManager.FindByEmailAsync(model.Email);
            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (user is null || !isPasswordValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "Invalid username or password."
                });
            }

            //Generate token
            JwtSecurityToken jwtToken = await GetToken(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                expiration = jwtToken.ValidTo
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

}
