import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material"
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SmallScreenHeader } from "./SmallScreenHeader";
import { LargeScreenHeader } from "./LargeScreenHeader";
import axios from "axios";


function Header() {
    const location = useLocation();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("md"))
    const [page, setPage] = useState(0);

    const handleSignOut = () => {
        axios.post("http://localhost:8080/logout", {}, { withCredentials: true })
            .then(res => console.log("Logout Successful"))
            .catch(err => console.log("Logout Not Successful"))
    }

    useEffect(() => {
        if (location.pathname === "/") setPage(0);
        else if (location.pathname === "/reports") setPage(1);
    }, [location.pathname]);

    return (
        <AppBar position="sticky">
            <Toolbar>
                {smallScreen ? <SmallScreenHeader handleSignOut = {handleSignOut} /> : <LargeScreenHeader page={page} handleSignOut = {handleSignOut} />}
            </Toolbar>
        </AppBar>
    )
}

export default Header