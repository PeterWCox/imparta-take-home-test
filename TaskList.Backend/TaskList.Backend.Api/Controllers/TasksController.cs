using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Backend.Api.Models;

namespace TaskList.Backend.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(int id)
        {
            var toDoItemModel = await _context.Tasks.FindAsync(id);

            if (toDoItemModel == null)
            {
                return NotFound();
            }

            return toDoItemModel;
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskModel toDoItemModel)
        {
            if (id != toDoItemModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDoItemModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoItemModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<TaskModel>> CreateTask(TaskModel toDoItemModel)
        {
            _context.Tasks.Add(toDoItemModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetToDoItemModel", new { id = toDoItemModel.Id }, toDoItemModel);
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var toDoItemModel = await _context.Tasks.FindAsync(id);
            if (toDoItemModel == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(toDoItemModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoItemModelExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
