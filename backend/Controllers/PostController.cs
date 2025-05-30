using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController(DemoDbContext context)
{
    private readonly DemoDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetPosts()
    {
        return await _context.Posts.Include(e => e.User).Select(static e => new
        {
            e.Id,
            date = e.Date == null ? null : e.Date.Value.ToString("MMMM dd, yyyy, hh:mm tt"),
            e.Title,
            e.Content,
            user = e.User == null ? null : new { e.User.Id, e.User.UserName } 
        }).ToListAsync();
    }
}
