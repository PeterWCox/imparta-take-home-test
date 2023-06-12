using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Backend.Api.Authentication;
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers;

// [Authorize]
[Route("api")]
[ApiController]
public class SubTasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IValidator<SubTaskModel> _subTaskValidator;

    public SubTasksController(
        ApplicationDbContext context,
        IValidator<SubTaskModel> subTaskValidator
    )
    {
        _context = context;
        _subTaskValidator = subTaskValidator;
    }

    //GET: api/TaskLists/1/Tasks/1/SubTasks/1
    [HttpGet("TaskLists/{taskListId:int}/Tasks/{taskId:int}/SubTasks/{subTaskId:int}")]
    public async Task<ActionResult<TaskModel>> GetSubTaskById(int taskListId, int taskId, int subTaskId)
    {
        try
        {
            //Try and find the task list
            var taskList = await _context.TaskLists
                .Include(t => t.Tasks)
                .FirstOrDefaultAsync(t => t.Id == taskListId);

            if (taskList == null)
            {
                return NotFound();
            }

            //Try and find the task
            var task = await _context.Tasks
                .Include(t => t.SubTasks)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound();
            }

            //Try and find the sub task
            var subTask = task.SubTasks.FirstOrDefault(t => t.Id == subTaskId);
            if (subTask == null)
            {
                return NotFound();
            }

            return Ok(subTask);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //GET: api/TaskLists/1/Tasks/1
    [HttpGet("TaskLists/{taskListId:int}/Tasks/{taskId:int}/SubTasks")]
    public async Task<ActionResult<TaskModel>> GetAllSubtasks(int taskListId, int taskId)
    {
        try
        {
            //Try and find the task list
            var taskList = await _context.TaskLists
                .FirstOrDefaultAsync(t => t.Id == taskListId);

            if (taskList is null)
            {
                return NotFound();
            }

            //Try and find the task
            var task = await _context.Tasks
                .Include(t => t.SubTasks)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (task is null)
            {
                return NotFound();
            }

            return Ok(task.SubTasks);

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //POST: api/TaskLists/1/Tasks/1
    [HttpPost("TaskLists/{taskListId:int}/Tasks/{taskId:int}/SubTasks")]
    public async Task<ActionResult<TaskModel>> CreateSubTask(int taskListId, int taskId, SubTaskModel subTask)
    {
        try
        {
            //Validate the subTask
            var validationResult = _subTaskValidator.Validate(subTask);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Try and find the task list
            var taskList = await _context.TaskLists
                .Include(tl => tl.Tasks)
                .FirstOrDefaultAsync(t => t.Id == taskListId);

            if (taskList == null)
            {
                return NotFound();
            }

            //Try and find the task
            var task = await _context.Tasks
                .Include(t => t.SubTasks)
                .FirstOrDefaultAsync(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound();
            }

            //Add the subtask 
            task.SubTasks.Add(subTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateSubTask", new { id = task.Id }, subTask);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //PUT: api/TaskLists/1/Tasks/1
    [HttpPut("TaskLists/{taskListId:int}/Tasks/{taskId:int}/SubTasks/{subTaskId:int}")]
    public async Task<ActionResult<TaskModel>> UpdateSubTask(int taskListId, int taskId, int subTaskId, SubTaskModel subTask)
    {
        try
        {
            //Validate the subTask
            var validationResult = _subTaskValidator.Validate(subTask);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Check if the task exists
            if (subTaskId != subTask.Id)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "The Id supplied does not match that of the task in the body"
                });
            }

            //Try and find the task list
            var taskList = await _context.TaskLists.Include(tl => tl.Tasks).FirstOrDefaultAsync(t => t.Id == taskListId);
            if (taskList == null)
            {
                return NotFound();
            }

            //Try and find the task
            var task = await _context.Tasks.Include(t => t.SubTasks).FirstOrDefaultAsync(t => t.Id == subTask.TaskId);
            if (task == null)
            {
                return NotFound();
            }

            //Replace the subtask
            var subTaskToReplace = task.SubTasks.FirstOrDefault(t => t.Id == subTaskId);
            if (subTaskToReplace == null)
            {
                return NotFound();
            }

            _context.Entry(task).State = EntityState.Modified;
            task.SubTasks.Remove(subTaskToReplace);
            task.SubTasks.Add(subTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //DELETE: api/TaskLists/1/Tasks/1/SubTasks/1
    [HttpDelete("TaskLists/{taskListId:int}/Tasks/{taskId:int}/SubTasks/{subTaskId:int}")]
    public async Task<ActionResult<TaskModel>> DeleteSubTask(int taskListId, int taskId, int subTaskId)
    {
        try
        {
            //Try and find the task list
            var taskList = await _context.TaskLists.Include(tl => tl.Tasks).FirstOrDefaultAsync(t => t.Id == taskListId);
            if (taskList == null)
            {
                return NotFound();
            }

            //Try and find the task
            var task = await _context.Tasks.Include(t => t.SubTasks).FirstOrDefaultAsync(t => t.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }

            //Delete the subtask
            var subTask = task.SubTasks.FirstOrDefault(t => t.Id == subTaskId);
            if (subTask == null)
            {
                return NotFound();
            }

            task.SubTasks.Remove(subTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }





}
