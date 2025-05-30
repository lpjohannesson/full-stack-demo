import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { FormContainer } from "react-hook-form-mui";
import './FormWindow.css'
import CloseIcon from '@mui/icons-material/Close';
import { LoadingView } from "../../LoadingView";

class FormWindowProps {
    onCloseWindow: any;
    onSubmit: any;
    isLoading: boolean | undefined;
    errors: string[] | undefined;
    title: string | undefined;
    inputs: any;
}

class FormWindowDerivedProps {
    onCloseWindow: any;
    onSuccess: any;
}

function FormWindow({ onCloseWindow, onSubmit, isLoading, errors, title, inputs }: FormWindowProps) {
    return (
        <Box className="window-back" sx={{ zIndex: "1" }}>
            <Card className="window-box">
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <Typography sx={{ textAlign: "center" }} variant="h6">{title}</Typography>
                        <IconButton onClick={onCloseWindow}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    <Box sx={{ visibility: isLoading ? "hidden" : "visible" }}>
                        <FormContainer onSuccess={onSubmit} >
                            <Box sx={{ marginBottom: "16px" }}>
                                {errors?.map((error, i) => (<Typography key={i} variant="subtitle2" sx={{ color: "red" }}>{error}</Typography>))}
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {inputs}
                                <Button type="submit" variant="contained">Submit</Button>
                            </Box>
                        </FormContainer>
                    </Box>
                </CardContent>
            </Card>
            {isLoading ? (<LoadingView />) : null}
        </Box>
    )
}

export { FormWindow, FormWindowDerivedProps }