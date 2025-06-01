import { Box, Button } from "@mui/material";
import { PostView } from "./components/PostView";
import { useEffect, useState } from "react";
import type { PostModel } from "../api/models/PostModel";
import { PostAPI } from "../api/PostAPI";
import { PageContainer } from "./components/PageContainer";
import { Link } from "react-router-dom";

export function HomePage() {
    const [posts, setPosts] = useState<PostModel[] | null>(null);

    useEffect(() => {
        (async () => {
            setPosts(await PostAPI.getPosts());
        })();
    }, [])

    return (
        <PageContainer isLoading={posts == null}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Button component={Link} to="/edit-post" variant="contained">Cergweg a post</Button>
                { posts?.map((post) => {
                    return (<PostView key={post.id} post={post} />);
                }) }
            </Box>
        </PageContainer>
    );
}