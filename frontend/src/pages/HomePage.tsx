import { Box } from "@mui/material";
import { PostView } from "./components/PostView";
import { useEffect, useState } from "react";
import type { PostModel } from "../api/models/PostModel";
import { PostAPI } from "../api/PostAPI";
import { PageContainer } from "./components/PageContainer";

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
                { posts?.map((post) => {
                    return (<PostView key={post.id} post={post} />);
                }) }
            </Box>
        </PageContainer>
    );
}