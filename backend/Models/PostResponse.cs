namespace backend.Models;

public class PostResponse
{
    public long Id { get; set; }
    public string? Date { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
    public UserResponse? User { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int UserReaction { get; set; }
}