import { TextField, Container, Paper, Typography, Box, Avatar, Button, Link, Alert } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState} from "react";


function Signin() {
    const navigate = useNavigate();

    const [signInError, setSignInError] = useState("")

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleInput = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const signInFormData = new URLSearchParams();
        signInFormData.append("username", user.username);
        signInFormData.append("password", user.password);
        axios.post("http://localhost:8080/login",
            signInFormData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                withCredentials: true
            })
        .then(res => 
            
            navigate("/"))
        .catch(err => {
            if(err.response.status === 401){
                setSignInError("Invalid username or password")
            } else {
                setSignInError("Something went wrong, please try again.")
            }
        })
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
                        Sign In
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
                            placeholder="Enter Password"
                            id="passwordField"
                            name = "password"
                            type="password"
                            variant="filled"
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
                            Sign In
                        </Button>

                        {signInError !== "" && (
                            <Alert variant="outlined" severity="error">{signInError}</Alert>
                        )}

                        <Typography sx={{display:"inline"}}>Need an Account? </Typography>

                        <Link component={RouterLink} to ="/signup">Sign Up</Link>

                    </Box>
                </Paper>
            </Container>  
        </Box>
    )
}

export default Signin