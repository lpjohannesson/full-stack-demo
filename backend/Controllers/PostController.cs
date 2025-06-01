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

    private static object GetPostData(Post post, User? user)
    {
        PostReaction? reaction = post.Reactions.FirstOrDefault(e => e.UserId == user?.Id);

        return new
        {
            post.Id,
            date = post.Date?.ToString("MMMM dd, yyyy, hh:mm tt"),
            post.Title,
            post.Content,
            user = post.User == null ? null : new { post.User.Id, post.User.UserName },
            likes = post.Reactions.Where(e => e.Liked).Count(),
            dislikes = post.Reactions.Where(e => !e.Liked).Count(),
            userReaction = reaction == null ? 0 : (reaction.Liked ? 1 : -1)
        };
    }

    private IQueryable<Post> GetPostQuery()
    {
        return _context.Posts
            .Include(e => e.User)
            .Include(e => e.Reactions);
    } 

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetPosts()
    {
        User? user = await _userManager.GetUserAsync(User);

        return await GetPostQuery()
            .OrderByDescending(e => e.Date)
            .Select(e => GetPostData(e, user))
            .ToListAsync();
    }

    
    [HttpGet("/Post/{id}")]
    public async Task<ActionResult<object>> GetPost(long id)
    {
        User? user = await _userManager.GetUserAsync(User);
        
        Post? post = await GetPostQuery()
            .Where(e => e.Id == id)
            .FirstOrDefaultAsync();

        if (post == null)
        {
            return NotFound();
        }

        return GetPostData(post, user);
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

    [HttpPut("/Post/{id}")]
    public async Task<ActionResult> EditPost(long id, [FromBody] PostRequest request)
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

        post.Title = request.Title;
        post.Content = request.Content;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("/Post/{id}")]
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
