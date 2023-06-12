using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskList.Backend.Api.Authentication;

namespace TaskList.Backend.Api.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<TaskListModel> TaskLists { get; set; }
    public DbSet<TaskModel> Tasks { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<TaskModel>(entity =>
        {
            entity.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(100);

            entity.Property(e => e.IsDone)
            .IsRequired()
            .HasMaxLength(1);

            entity.Property(e => e.Status)
             .IsRequired();

        });

        base.OnModelCreating(builder);
    }
}
