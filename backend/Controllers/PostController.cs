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
    public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
    {
        return await _context.Posts.ToListAsync();
    }
}
