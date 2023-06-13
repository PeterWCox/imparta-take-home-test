using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IValidator<TaskModel> _taskValidator;

    public TasksController(ApplicationDbContext context, IValidator<TaskModel> taskValidator)
    {

        _context = context;
        _taskValidator = taskValidator;
    }

    //GET: api/TaskLists/1/Tasks/1
    [HttpGet("TaskLists/{taskListId:int}/Tasks/{taskId:int}")]
    public async Task<ActionResult<TaskModel>> GetTaskById(int taskListId, int taskId)
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
            var task = taskList.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //GET: api/TaskLists/1/Tasks
    [HttpGet("TaskLists/{taskListId:int}/Tasks")]
    public async Task<ActionResult<TaskModel>> GetTasks(int taskListId)
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

            return Ok(taskList.Tasks);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    //POST: api/TaskLists/1/Tasks
    [HttpPost("TaskLists/{taskListId:int}/Tasks")]
    public async Task<ActionResult<TaskModel>> CreateTask(int taskListId, TaskModel task)
    {
        try
        {
            //Validate the task
            var validationResult = _taskValidator.Validate(task);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Try and find the task list
            var taskList = await _context.TaskLists.FirstOrDefaultAsync(t => t.Id == taskListId);
            if (taskList == null)
            {
                return NotFound();
            }


            //Add the task to the task list
            taskList.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateTask", new { id = task.Id }, task);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    [HttpPatch("TaskLists/{taskListId:int}/Tasks/{taskId:int}")]
    public IActionResult UpdateTask(int taskListId, int taskId, [FromBody] JsonPatchDocument<TaskModel> patchDoc)
    {
        if (patchDoc != null)
        {
            //Get the tasklist using EF
            var taskList = _context.TaskLists
                .Include(tl => tl.Tasks)
                .FirstOrDefault(x => x.Id == taskListId);

            //Get the task
            var task = taskList.Tasks.FirstOrDefault(x => x.Id == taskId);
            patchDoc.ApplyTo(task, ModelState);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SaveChangesAsync();
            return new ObjectResult(taskList);
        }
        else
        {
            return BadRequest(ModelState);
        }
    }


    //DELETE: api/TaskLists/1/Tasks/1
    [HttpDelete("TaskLists/{taskListId:int}/Tasks/{taskId:int}")]
    public async Task<ActionResult<TaskModel>> DeleteTask(int taskListId, int taskId)
    {
        try
        {
            //Check if the task list exists
            TaskModel task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }

            // //Remove the task from the task list
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }


}
