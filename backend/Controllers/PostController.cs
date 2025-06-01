using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController(DemoDbContext context, UserManager<User> userManager) : Controller
{
    private readonly DemoDbContext _context = context;
    private readonly UserManager<User> _userManager = userManager;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetPosts()
    {
        return await _context.Posts
            .Include(e => e.User)
            .OrderByDescending(e => e.Date)
            .Select(static e => new
            {
                e.Id,
                date = e.Date == null ? null : e.Date.Value.ToString("MMMM dd, yyyy, hh:mm tt"),
                e.Title,
                e.Content,
                user = e.User == null ? null : new { e.User.Id, e.User.UserName }
            }).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> CreatePost([FromBody] PostRequest request)
    {
        User? user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        Post post = new()
        {
            Date = DateTime.Now,
            Title = request.Title,
            Content = request.Content,
            User = user
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("/{id}")]
    public async Task<ActionResult> DeletePost(long id)
    {
        User? user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        Post? post = await _context.Posts
            .Where(e => e.Id == id)
            .FirstOrDefaultAsync();

        if (post == null)
        {
            return NotFound();
        }

        if (post.UserId != user.Id)
        {
            return Unauthorized();
        }

        _context.Remove(post);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
