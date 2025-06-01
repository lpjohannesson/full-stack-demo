import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme'
import { EditPostPage } from './pages/EditPostPage'
import { UserContext } from './UserContext'
import type { UserModel } from './api/models/UserModel'
import { useEffect, useState } from 'react'
import { AccountAPI } from './api/AccountAPI'

function App() {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    (async () => {
      if (AccountAPI.isLoggedIn()) {
        const user = await AccountAPI.getUser();
        
        if (user == null) {
          AccountAPI.logout();
        }
        else {
          setUser(user);
        }
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit-post" element={<EditPostPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App;
