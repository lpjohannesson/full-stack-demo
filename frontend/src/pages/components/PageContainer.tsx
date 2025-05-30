import { Box, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoginWindow } from './windows/LoginWindow';
import { RegisterWindow } from './windows/RegisterWindow';
import { LoadingView } from '../LoadingView';
import { AccountAPI } from '../../api/AccountAPI';

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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(AccountAPI.isLoggedIn());

    function onCloseWindow() {
        setPageState(PageState.Content);
    }

    function showLogin() {
        setPageState(PageState.Content);
        setIsLoggedIn(true);
    }

    console.log(isLoggedIn);

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "lightgray" }}>
                <Button component={Link} to="/">Full-Stack Demo</Button>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    { isLoggedIn ? 
                        (<>
                            <Button variant="contained" onClick={() => {
                                AccountAPI.logout();
                                setIsLoggedIn(false);
                            }}>Log out</Button>
                        </>) :
                        (<>
                            <Button variant="contained" onClick={() => { setPageState(PageState.Register); }}>Register</Button>
                            <Button variant="contained" onClick={() => { setPageState(PageState.Login); }}>Login</Button>
                        </>)
                    }
                </Box>
            </Toolbar>
            <Box>
                { isLoading ? (<LoadingView />) : 
                    <Box sx={{ maxWidth: "512px", margin: "auto", marginTop: "16px" }}>
                        {children}
                    </Box> }
                { pageState == PageState.Login ? <LoginWindow onCloseWindow={onCloseWindow} onSuccess={showLogin} /> : null }
                { pageState == PageState.Register ? <RegisterWindow onCloseWindow={onCloseWindow} onSuccess={showLogin} /> : null }
            </Box>
        </Box>
    );
}