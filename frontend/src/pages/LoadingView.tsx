import { Box } from "@mui/material";
import { BeatLoader } from "react-spinners";

export function LoadingView() {
    return (
        <Box sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <BeatLoader />
        </Box>
    )
}