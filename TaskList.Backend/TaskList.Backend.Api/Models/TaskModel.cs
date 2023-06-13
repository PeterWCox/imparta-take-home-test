using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskList.Backend.Api.Models;

public class TaskListModel
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public ICollection<TaskModel> Tasks { get; } = new List<TaskModel>(); // Collection navigation containing dependents
}


public class TaskModel
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public int Status { get; set; }
    public bool IsDone { get; set; }
    public bool IsMyDay { get; set; }
    public bool IsImportant { get; set; }
    public DateTime? DueDate { get; set; }
    public string Notes { get; set; } = null!;
    public ICollection<SubTaskModel> SubTasks { get; } = new List<SubTaskModel>(); // Collection navigation containing dependents


    //Foreign Keys
    public int TaskListId { get; set; } // Required foreign key property
    public TaskListModel TaskList { get; set; } = null!; // Required reference navigation to principal
}

public class SubTaskModel
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsDone { get; set; }


    //Foreign Keys
    public int TaskId { get; set; } // Required foreign key property
    public TaskModel Task { get; set; } = null!; // Required reference navigation to principal
}