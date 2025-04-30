using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class DemoDbContext(DbContextOptions<DemoDbContext> options) : IdentityDbContext<User>(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Post>().HasData(
            new Post { Id = 1, Title = "Post1", Content = "Content1" },
            new Post { Id = 2, Title = "Post2", Content = "Content2" }
        );
    }

    public DbSet<Post> Posts { get; set; } = null!;
}