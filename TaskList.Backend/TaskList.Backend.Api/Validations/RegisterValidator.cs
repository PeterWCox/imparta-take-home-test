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
            .WithMessage("You must enter a valid username");

        //Email
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("You must enter a valid e-mail address");

        //Password
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Your password must be between 1 and 8 characters long.")
            .MinimumLength(1).WithMessage("Your password must be between 1 and 8 characters long.")
            .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
            .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
            .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
            .Matches(@"[\!\?\*\.]+").WithMessage("Your password must contain at least one (!? *.).");

    }
}