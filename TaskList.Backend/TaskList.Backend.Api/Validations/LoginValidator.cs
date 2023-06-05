using FluentValidation;
using TaskList.Backend.Api.Models;

public class LoginValidator : AbstractValidator<LoginModel>
{
    public LoginValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        //Username
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Username must not be empty");

        //Email
        RuleFor(x => x.Email)
             .NotEmpty()
             .WithMessage("Email must not be empty");

    }
}