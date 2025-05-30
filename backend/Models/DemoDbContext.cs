using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Models;

public class DemoDbContext(DbContextOptions<DemoDbContext> options) : IdentityDbContext<User>(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        PasswordHasher<User> hasher = new();
        User testUser = new()
        {
            UserName = "test@test.com",
            NormalizedUserName = "TEST@TEST.COM",
            Email = "test@test.com",
            NormalizedEmail = "TEST@TEST.COM",
            PasswordHash = hasher.HashPassword(null, "Password1!")
        };

        modelBuilder.Entity<User>().HasData(testUser);

        modelBuilder.Entity<Post>().HasData(
            new Post { Id = 1, Title = "Post1", Content = "Content1" },
            new Post { Id = 2, Title = "Post2", Content = "Content2" }
        );
    }

    public DbSet<Post> Posts { get; set; } = null!;
}