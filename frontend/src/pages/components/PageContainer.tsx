import { Box, Button, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useContext, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginWindow } from './windows/LoginWindow';
import { RegisterWindow } from './windows/RegisterWindow';
import { LoadingView } from './LoadingView';
import { AccountAPI } from '../../api/AccountAPI';
import { UserContext } from '../../UserContext';

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
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function onCloseWindow() {
        setPageState(PageState.Content);
    }

    async function login() {
        setUser(await AccountAPI.getUser());

        setPageState(PageState.Content);
    }

    async function logout() {
        AccountAPI.logout();
        setUser(null);

        navigate("/");
    }

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "lightgray" }}>
                <Button component={Link} to="/">Full-Stack Demo</Button>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    { user == null ? 
                        (AccountAPI.isLoggedIn() ? null : <>
                            <Button variant="contained" onClick={() => { setPageState(PageState.Register); }}>Register</Button>
                            <Button variant="contained" onClick={() => { setPageState(PageState.Login); }}>Login</Button>
                        </>) :
                        (<Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {user ? <Typography>Hello, {user.userName}!</Typography> : null}
                            <Button variant="contained" onClick={logout}>Log out</Button>
                        </Box>)
                    }
                </Box>
            </Toolbar>
            <Box>
                { isLoading ? (<LoadingView />) : 
                    <Box sx={{ maxWidth: "512px", margin: "auto", marginTop: "16px" }}>
                        {children}
                    </Box> }
                { pageState == PageState.Login ? <LoginWindow onCloseWindow={onCloseWindow} onSuccess={login} /> : null }
                { pageState == PageState.Register ? <RegisterWindow onCloseWindow={onCloseWindow} onSuccess={login} /> : null }
            </Box>
        </Box>
    );
}