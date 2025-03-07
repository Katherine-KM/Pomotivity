import { useState } from 'react'
import './App.css'
import { Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme} from './theme'
import {Routes, Route} from "react-router-dom"
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/> 
        <main className='main-content'>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </main>
    </ThemeProvider>
  )
}

export default App
