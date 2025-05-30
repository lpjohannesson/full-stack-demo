namespace backend.Models;

public class Post {
    public long Id { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
    public string? UserId { get; set; }
}