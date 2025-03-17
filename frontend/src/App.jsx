import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from './theme'
import {Routes, Route} from "react-router-dom"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import RequireAuth from './utils/RequireAuth';
import Reports from './pages/Reports';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(2);

  const today = `${month}/${day}/${year}`;


  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline/> 
        <main className='main-content'>
          <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Home today = {today} />}/>
              <Route path="/reports" element={<Reports today = {today} />}/>
            </Route>
          </Routes>
        </main>
        </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
