using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Backend.Api.Authentication;
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers;

// [Authorize]
[Route("api/[controller]")]
[ApiController]
public class TaskListsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IValidator<TaskListModel> _taskListValidator;
    private readonly ILogger<TaskListsController> _logger;

    public TaskListsController(
        ApplicationDbContext context,
        IValidator<TaskListModel> taskListValidator,
        ILogger<TaskListsController> logger
    )
    {
        _context = context;
        _taskListValidator = taskListValidator;
        _logger = logger;
    }

    // GET: api/TaskLists
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskListModel>>> GetTasksLists()
    {
        try
        {
            var taskLists = await _context.TaskLists.ToListAsync();

            if (taskLists == null)
            {
                return NotFound();
            }

            return Ok(taskLists);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }

    }

    // GET: api/TasksLists/1
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksListsById(int id)
    {
        try
        {
            TaskListModel taskList = await _context.TaskLists
                       .Include(t => t.Tasks)
                       .FirstAsync(t => t.Id == id);


            if (taskList == null)
            {
                return NotFound();
            }

            return Ok(taskList);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }

    }

    // POST: api/TaskLists
    [HttpPost]
    public async Task<ActionResult<TaskModel>> CreateTaskList(TaskListModel taskList)
    {
        try
        {
            //Validate the TaskList
            var validationResult = _taskListValidator.Validate(taskList);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Add the TaskList to the database
            _context.TaskLists.Add(taskList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateTaskList", new { id = taskList.Id }, taskList);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    // PUT: api/TaskLists/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTaskList(int id, TaskListModel taskList)
    {
        try
        {
            //Validate the Id
            if (id != taskList.Id)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = "The Id supplied does not match that of the task in the body"
                });
            }

            //Validate the task
            var validationResult = await _taskListValidator.ValidateAsync(taskList);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response
                {
                    Status = "Error",
                    Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. "
                });
            }

            //Update the task in the database
            _context.Entry(taskList).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    // DELETE: api/TaskLists/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTaskList(int id)
    {
        try
        {
            var taskList = await _context.TaskLists.FindAsync(id);
            if (taskList == null)
            {
                return NotFound();
            }

            _context.TaskLists.Remove(taskList);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }



}
