using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskList.Backend.Api.Models;

public class TaskModel
{
    [Key]
    public int Id { get; set; }

    public string Title { get; set; }

    public bool IsDone { get; set; }

    public int Status { get; set; }
}
