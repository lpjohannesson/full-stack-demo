import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import type { PostModel } from "../../api/models/PostModel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { UserContext } from "../../UserContext";

class PostViewProps {
    post: PostModel | undefined;
    deletePost: any;
}

export function PostView({ post, deletePost }: PostViewProps) {
    const { user } = useContext(UserContext);

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
                        <Button variant="outlined" startIcon={<ThumbUpIcon />}>
                            1
                        </Button>
                        <Typography>0</Typography>
                        <Button variant="outlined" endIcon={<ThumbDownIcon />}>
                            1
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
                    <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deletePost(post?.id ?? 0)}>Delete</Button>
                </> }
            </CardActions>
        </Card>
    )
}