import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

export function LoadingView() {
    return (
        <Box sx={{ position: "absolute", width: "100%", left: "0%", display: "flex", justifyContent: "center" }}>
            <BeatLoader />
        </Box>
    )
}