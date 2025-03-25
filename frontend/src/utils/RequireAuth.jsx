import {Outlet, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

function RequireAuth () {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pomotivity-latest.onrender.com/api/v1/auth/user", {
            withCredentials: true
        })
        .then(res => {
            console.log("Authenticated")
        })
        .catch(err => {
            console.log("Not Authenticated")
            navigate("/login")
        })
    }, [])
    return <Outlet /> 
}

export default RequireAuth;