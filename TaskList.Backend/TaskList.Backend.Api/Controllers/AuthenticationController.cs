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
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly IValidator<LoginModel> _loginValidator;
    private readonly IValidator<RegisterModel> _registerValidator;


    public AuthenticationController(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration,
        IValidator<LoginModel> loginValidator,
        IValidator<LoginModel> validator,
        IValidator<RegisterModel> registerValidator
    )
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _loginValidator = loginValidator;
        _registerValidator = registerValidator;
    }

    // GET: api/Authentication/me
    [HttpGet]
    [Route("me")]
    public async Task<IActionResult> Me()
    {
        //Get bearer token from Headers as a string 
        var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        //Decode token to get the claims
        var handler = new JwtSecurityTokenHandler();
        var decodedToken = handler.ReadJwtToken(token);
        if (decodedToken == null)
        {
            return Unauthorized();
        }

        //Get the email claim
        var claims = decodedToken.Claims.ToList();
        var name = claims[0].Value;
        var user = await _userManager.FindByNameAsync(name);
        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            user.Id,
            user.UserName,
            user.Email
        });


    }


    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var x = _loginValidator.Validate(model);
        if (!x.IsValid)
        {
            return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = x.Errors[0].ErrorMessage ?? "An unknown error has occured. " });
        }

        ApplicationUser user = await _userManager.FindByEmailAsync(model.Email);
        bool isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);

        if (user != null && isPasswordValid)
        {
            var token = await GetToken(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }

        return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Invalid username or password." });
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        //Ensure that the model is valid
        var x = _registerValidator.Validate(model);
        if (!x.IsValid)
        {
            return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = x.Errors[0].ErrorMessage ?? "An unknown error has occured. " });
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

        //Check if user has already registered their user-name
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
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "An unknown error has occured. Please try again later." });
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
