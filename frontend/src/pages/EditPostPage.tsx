import { FormContainer, TextareaAutosizeElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { PageContainer } from "./components/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PostAPI } from "../api/PostAPI";
import { useEffect, useState } from "react";

export function EditPostPage() {
    const form = useForm();
    const { reset } = form;

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();
    
    async function onSubmit(body: any) {
        setIsLoading(true);
        
        if (id == undefined) {
            await PostAPI.createPost(body);
        }
        else {
            await PostAPI.editPost(parseInt(id), body);
        }

        navigate("/");
    }

    useEffect(() => {
        (async () => {
            if (id == undefined) {
                return;
            }

            setIsLoading(true);
            var post = await PostAPI.getPost(parseInt(id));

            if (post == null) {
                navigate("/");
                return;
            }

            reset({
                title: post.title,
                content: post.content
            });

            setIsLoading(false);
        })();
      }, []);

    return (
        <PageContainer isLoading={isLoading}>
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>Edit Post</Typography>
            <FormContainer formContext={form} onSuccess={onSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextFieldElement type="text" name="title" label="Title" required />
                    <TextareaAutosizeElement name="content" label="Content" required />
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </FormContainer>
        </PageContainer>
    )
}

