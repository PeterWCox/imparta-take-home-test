using FluentValidation;
using TaskList.Backend.Api.Models;

public class TaskValidator : AbstractValidator<TaskModel>
{
    public TaskValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        //Title
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200)
            .WithMessage("Task name must be less than 100 characters");

    }
}