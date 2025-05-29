import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoginWindow } from './windows/LoginWindow';
import { RegisterWindow } from './windows/RegisterWindow';
import { LoadingView } from '../LoadingView';

enum PageState {
    Content,
    Login,
    Register
}

class PageContainerProps {
    children: ReactNode | undefined;
    isLoading: boolean = true;
}

export function PageContainer({ children, isLoading }: PageContainerProps) {
    const [pageState, setPageState] = useState<PageState>(PageState.Content);

    function onCloseWindow() {
        setPageState(PageState.Content);
    }

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "lightgray" }}>
                <Button component={Link} to="/">Full-Stack Demo</Button>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    <Button variant="contained" onClick={() => { setPageState(PageState.Register); }}>Register</Button>
                    <Button variant="contained" onClick={() => { setPageState(PageState.Login); }}>Login</Button>
                </Box>
            </Toolbar>
            <Box sx={{ padding: "16px" }}>
                { isLoading ? (<LoadingView />) : children }
                { pageState == PageState.Login ? <LoginWindow onCloseWindow={onCloseWindow} /> : null }
                { pageState == PageState.Register ? <RegisterWindow onCloseWindow={onCloseWindow} /> : null }
            </Box>
        </Box>
    );
}