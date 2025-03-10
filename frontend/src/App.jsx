import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from './theme'
import {Routes, Route} from "react-router-dom"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
        <main className='main-content'>
          <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/reports" element={<Reports/>}/>
          </Routes>
        </main>
    </ThemeProvider>
  )
}

export default App
