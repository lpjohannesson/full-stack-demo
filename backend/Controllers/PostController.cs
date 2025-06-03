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

    private static PostResponse GetPostData(Post post, User? user)
    {
        PostReaction? reaction = post.Reactions.FirstOrDefault(e => e.UserId == user?.Id);

        return new PostResponse
        {
            Id = post.Id,
            Date = post.Date?.ToString("MMMM dd, yyyy, hh:mm tt"),
            Title = post.Title,
            Content = post.Content,
            User = post.User == null ? null : new UserResponse
            {
                Id = post.User.Id,
                UserName = post.User.UserName
            },
            Likes = post.Reactions.Where(e => e.Liked && e.UserId != user?.Id).Count(),
            Dislikes = post.Reactions.Where(e => !e.Liked && e.UserId != user?.Id).Count(),
            UserReaction = reaction == null ? 0 : (reaction.Liked ? 1 : -1)
        };
    }

    private IQueryable<Post> GetPostQuery()
    {
        return _context.Posts
            .Include(e => e.User)
            .Include(e => e.Reactions);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostResponse>>> GetPosts()
    {
        User? user = await _userManager.GetUserAsync(User);

        return await GetPostQuery()
            .OrderByDescending(e => e.Date)
            .Select(e => GetPostData(e, user))
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PostResponse>> GetPost(long id)
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

    [HttpPut("{id}")]
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

    [HttpDelete("{id}")]
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

    [HttpPost("SetReaction")]
    public async Task<ActionResult> SetReaction([FromBody] PostReactionRequest request)
    {
        User? user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        if (!_context.Posts.Any(e => e.Id == request.PostId))
        {
            return NotFound();
        }

        PostReaction? postReaction = await _context.PostReactions
            .Where(e => e.UserId == user.Id && e.PostId == request.PostId)
            .FirstOrDefaultAsync();

        if (request.Reaction == 0)
        {
            // Remove reaction
            if (postReaction != null)
            {
                _context.Remove(postReaction);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        // Add reaction
        if (postReaction == null)
        {
            postReaction = new PostReaction() { UserId = user.Id, PostId = request.PostId };
            _context.PostReactions.Add(postReaction);
        }

        postReaction.Liked = request.Reaction > 0;
        await _context.SaveChangesAsync();

        return Ok();
    }
}
