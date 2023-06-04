using FluentValidation;
using TaskList.Backend.Api.Models;

public class RegisterValidator : AbstractValidator<RegisterModel>
{
    public RegisterValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        //Name
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Username must not be blank ");

        //Email
        RuleFor(x => x.Username)
            .NotEmpty()
            .WithMessage("Email must not be blank and be a valid e-mail");

        //Password
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(1)
            .WithMessage("Password must not be blank and be at least 1 character");

    }
}