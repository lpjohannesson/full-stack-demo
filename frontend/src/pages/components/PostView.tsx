import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import type { PostModel } from "../../api/models/PostModel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { PostAPI } from "../../api/PostAPI";

class PostViewProps {
    post: PostModel | undefined;
    deletePost: any;
}

export function PostView({ post, deletePost }: PostViewProps) {
    const { user } = useContext(UserContext);

    const [userReaction, setUserReaction] = useState<number>(post?.userReaction ?? 0);

    const liked = userReaction == 1;
    const disliked = userReaction == -1;

    const likes = (post?.likes ?? 0) + (liked ? 1 : 0);
    const dislikes = (post?.dislikes ?? 0) + (disliked ? 1 : 0);

    async function sendUserReaction(n: number) {
        if (user == null) {
            return;
        }

        const newReaction = userReaction == n ? 0 : n;
        setUserReaction(newReaction);

        await PostAPI.setReaction({ postId: post?.id, reaction: newReaction })
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Avatar src="https://material.angular.io/assets/img/examples/shiba1.jpg" />
                        <Box>
                            <Typography variant="h6">{post?.title}</Typography>
                            <Typography>
                                by <Link to="/">{post?.user?.userName}</Link>
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Button variant={ liked ? "contained" : "outlined" } startIcon={<ThumbUpIcon />}
                            onClick={() => sendUserReaction(1)}>
                            {likes}
                        </Button>
                        <Typography>{likes - dislikes}</Typography>
                        <Button variant={ disliked ? "contained" : "outlined" } endIcon={<ThumbDownIcon />}
                            onClick={() => sendUserReaction(-1)}>
                            {dislikes}
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ margin: "8px 0" }} />
                <Typography variant="body1">{post?.content}</Typography>
                <Typography variant="subtitle2" color="textDisabled">{post?.date}</Typography>
            </CardContent>
            <CardActions>
                { post?.user?.id != user?.id ? null : 
                <>
                    <Button component={Link} to={`/edit-post/${post?.id}`} variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deletePost(post?.id ?? 0)}>Delete</Button>
                </> }
            </CardActions>
        </Card>
    )
}