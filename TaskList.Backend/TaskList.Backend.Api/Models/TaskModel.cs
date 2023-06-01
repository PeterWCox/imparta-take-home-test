using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskList.Backend.Api.Models
{
    public class TaskModel
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }

        [Required(ErrorMessage = "IsDone is required")]
        [Column(TypeName = "bit")]
        public bool IsDone { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public int Status { get; set; }
    }
}
