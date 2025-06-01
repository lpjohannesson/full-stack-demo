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
            new Post { Id = 1, Date = DateTime.Now, Title = "Post1", Content = "Content1", UserId = testUser.Id },
            new Post { Id = 2, Date = DateTime.Now, Title = "Post2", Content = "Content2", UserId = testUser.Id }
        );

        modelBuilder.Entity<PostReaction>().HasData(
            new PostReaction { Id = 1, UserId = testUser.Id, PostId = 1, Liked = true }
        );
    }

    public DbSet<Post> Posts { get; set; }
    public DbSet<PostReaction> PostReactions { get; set; }
}