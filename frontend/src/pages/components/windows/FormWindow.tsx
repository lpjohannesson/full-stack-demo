import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import './FormWindow.css'
import CloseIcon from '@mui/icons-material/Close';


class FormWindowProps {
    onCloseWindow: (() => void) | undefined;
    onSubmit: (() => void) | undefined;
    title: string | undefined;
}

class FormWindowDerivedProps {
    onCloseWindow: (() => void) | undefined;
}

function FormWindow({ onCloseWindow, onSubmit, title }: FormWindowProps) {
    return (
        <Box className="window-back">
            <Card className="window-box">
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <Typography sx={{ textAlign: "center" }} variant="h6">{title}</Typography>
                        <IconButton onClick={onCloseWindow}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <FormContainer onSuccess={onSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <TextFieldElement name="email" label="Email" required />
                            <TextFieldElement name="password" label="Password" required />
                            <Button type="submit" variant="contained">Submit</Button>
                        </Box>
                    </FormContainer>
                </CardContent>
            </Card>
        </Box>
    )
}

export { FormWindow, FormWindowDerivedProps }