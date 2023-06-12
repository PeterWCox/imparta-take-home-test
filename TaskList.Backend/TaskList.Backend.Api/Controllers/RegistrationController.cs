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
public class RegistrationController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly IValidator<RegisterModel> _registerValidator;


    public RegistrationController(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration,
        IValidator<RegisterModel> registerValidator
    )
    {
        _userManager = userManager;
        _configuration = configuration;
        _registerValidator = registerValidator;
    }

    // POST: api/Registration
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        try
        {
            //Ensure that the model is valid
            var validationResult = _registerValidator.Validate(model);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Check if user has already registered their e-mail address
            ApplicationUser emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists is not null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "An account has already been registered for this e-mail address"
                });
            };

            //Check if user has already registered their username
            ApplicationUser userNameExists = await _userManager.FindByNameAsync(model.Username);
            if (userNameExists is not null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "An account has already been registered for this username"
                });
            };

            //Create the user and save it to the DB 
            var user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response
                {
                    Status = "Error",
                    Message = "An internal server has occured. Please try again later."
                });
            }

            //Generate a bearer token to send in the response body
            ApplicationUser newUser = await _userManager.FindByEmailAsync(model.Email);
            var token = await GetToken(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
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
