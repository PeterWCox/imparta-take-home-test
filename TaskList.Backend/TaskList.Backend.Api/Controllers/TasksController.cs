using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Backend.Api.Authentication;
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers;

[Authorize]
[Route("api/[controller]")]
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

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
    {
        var tasks = await _context.Tasks.ToListAsync();

        if (tasks == null)
        {
            return NotFound();
        }

        return Ok(tasks);
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskModel>> GetTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = e.Message });
        }

    }

    // POST: api/Task
    [HttpPost]
    public async Task<ActionResult<TaskModel>> CreateTask(TaskModel task)
    {
        try
        {
            //Validate the task
            var validationResult = await _taskValidator.ValidateAsync(task);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. " });
            }

            var result = await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CreateTask", new { id = task.Id }, task);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    // PUT: api/Tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskModel task)
    {
        try
        {
            if (id != task.Id)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "The Id supplied does not match that of the task in the body" });
            }

            //Validate the task
            var validationResult = await _taskValidator.ValidateAsync(task);
            if (!validationResult.IsValid)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = validationResult.Errors[0].ErrorMessage ?? "An unknown error has occured. " });
            }

            _context.Entry(task).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    // DELETE: api/Task/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    private bool TaskExists(int id)
    {
        return _context.Tasks.Any(e => e.Id == id);
    }
}
