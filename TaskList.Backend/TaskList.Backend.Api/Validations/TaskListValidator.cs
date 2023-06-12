using FluentValidation;
using TaskList.Backend.Api.Models;

public class TaskListValidator : AbstractValidator<TaskListModel>
{
    public TaskListValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        //Title
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200)
            .WithMessage("Task list title must be less than 100 characters");

    }
}