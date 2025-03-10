import { TextField, Container, Paper, Typography, Box, Avatar, Button, Link } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        tasks: []
    })

    const handleInput = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/signup", user)
        .then(res => navigate("/login"))
        .catch()
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{py:4, px: 2}}>
                    <Avatar sx={{
                        mx: "auto",
                        bgcolor: "secondary.main",
                    }}>
                        <AccountCircleOutlinedIcon 
                            sx={{textAlign:"center"}}
                        />
                    </Avatar>
                    <Typography 
                        component="h1"
                        variant="h5" 
                        sx={{my: 2, textAlign:"center"}}
                    >
                        Sign Up 
                    </Typography>
                    <Box
                        component="form"
                        sx={{mx: 4}}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            placeholder="Enter Username"
                            id="usernameField"
                            variant="filled"
                            name = "username"
                            fullWidth
                            required
                            autoFocus
                            onChange={handleInput}
                            sx={{mb:2}}
                        />
                        <TextField
                            placeholder="Enter Email"
                            id="emailField"
                            name = "email"
                            variant="filled"
                            fullWidth
                            required
                            onChange={handleInput}
                            sx={{mb:2}}
                        />
                         <TextField
                            placeholder="Enter Password"
                            id="passwordField"
                            name = "password"
                            variant="filled"
                            type="password"
                            fullWidth
                            required
                            onChange={handleInput}
                            sx={{mb:2}}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{mb: 2}}
                        >
                            Sign up
                        </Button>

                        <Typography sx={{display:"inline"}}>Already Have an Account? </Typography>

                        <Link component={RouterLink} to ="/login">Sign In</Link>

                    </Box>
                </Paper>
            </Container>  
        </Box>
    )
}

export default Signup
