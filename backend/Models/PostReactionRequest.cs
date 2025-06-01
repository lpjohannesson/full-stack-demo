namespace backend.Models;

public class PostReactionRequest
{
    public long PostId { get; set; }
    public int Reaction { get; set; }
}