import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { PageContainer } from "./components/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function EditPostPage() {
    const { register } = useForm();
    const navigate = useNavigate();
    
    function onSubmit(body: any) {
        navigate("/");
    }

    return (
        <PageContainer isLoading={false}>
            <Typography variant="h4" sx={{ marginBottom: "16px" }}>Edit Post</Typography>
            <FormContainer onSuccess={onSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextFieldElement type="text" {...register("title")} label="Title" required />
                    <TextFieldElement type="text" {...register("content")} label="Content" required />
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </FormContainer>
        </PageContainer>
    )
}

