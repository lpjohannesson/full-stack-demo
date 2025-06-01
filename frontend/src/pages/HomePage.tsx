import { Box, Button } from "@mui/material";
import { PostView } from "./components/PostView";
import { useContext, useEffect, useState } from "react";
import type { PostModel } from "../api/models/PostModel";
import { PostAPI } from "../api/PostAPI";
import { PageContainer } from "./components/PageContainer";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export function HomePage() {
    const [posts, setPosts] = useState<PostModel[] | null>(null);
    const { user } = useContext(UserContext);

    async function deletePost(id: number) {
        setPosts(null);
        await PostAPI.deletePost(id);
        setPosts(await PostAPI.getPosts());
    }

    useEffect(() => {
        (async () => {
            setPosts(await PostAPI.getPosts());
        })();
    }, []);

    return (
        <PageContainer isLoading={posts == null}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                { user == null ? null : <Button component={Link} to="/edit-post" variant="contained">Create a post</Button> }
                { posts?.map((post) => {
                    return (<PostView key={post.id} post={post} deletePost={deletePost} />);
                }) }
            </Box>
        </PageContainer>
    );
}