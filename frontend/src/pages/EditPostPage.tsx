import { FormContainer, TextareaAutosizeElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { PageContainer } from "./components/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../api/PostAPI";
import { useState } from "react";

export function EditPostPage() {
    const { register } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    async function onSubmit(body: any) {
        setIsLoading(true);
        await PostAPI.createPost(body);
        navigate("/");
    }

    return (
        <PageContainer isLoading={isLoading}>
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>Edit Post</Typography>
            <FormContainer onSuccess={onSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextFieldElement type="text" {...register("title")} label="Title" required />
                    <TextareaAutosizeElement {...register("content")} label="Content" required />
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </FormContainer>
        </PageContainer>
    )
}

