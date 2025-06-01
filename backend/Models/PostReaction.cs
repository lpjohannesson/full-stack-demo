namespace backend.Models;

public class PostReaction
{
    public long Id { get; set; }
    
    public User? User { get; set; }
    public string? UserId { get; set; }

    public Post? Post { get; set; }
    public long? PostId { get; set; }

    
    public bool Liked { get; set; }
}