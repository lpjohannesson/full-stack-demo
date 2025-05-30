import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import type { PostModel } from "../../api/models/PostModel";

class PostViewProps {
    post: PostModel | undefined;
}

export function PostView({ post }: PostViewProps) {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Avatar src="https://material.angular.io/assets/img/examples/shiba1.jpg" />
                        <Box>
                            <Typography variant="h6">{post?.title}</Typography>
                            <Typography>
                                by <Link to="/">user123</Link>
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
                <Typography variant="subtitle2" color="textDisabled">
                    January 1st, 2025, 2:00 PM
                </Typography>
            </CardContent>
        </Card>
    )
}