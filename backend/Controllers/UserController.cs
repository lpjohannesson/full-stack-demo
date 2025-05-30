using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(DemoDbContext context, UserManager<User> userManager) : Controller
{
    private readonly DemoDbContext _context = context;
    private readonly UserManager<User> _userManager = userManager;

    [HttpGet]
    public async Task<ActionResult<object>> GetUser()
    {
        User? user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        return new { id = user.Id, userName = user.UserName };
    }
}
