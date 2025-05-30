import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { PageContainer } from "./components/PageContainer";
import { Box, Button, Typography } from "@mui/material";

export function EditPostPage() {
    const { register } = useForm();
    
    function onSubmit(body: any) {
        
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

