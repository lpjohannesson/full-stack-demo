import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme'
import { EditPostPage } from './pages/EditPostPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit-post" element={<EditPostPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
