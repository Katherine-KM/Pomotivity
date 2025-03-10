import { AppBar, Typography, Link, Avatar, Container, Toolbar, Tabs, Tab, Button} from "@mui/material"
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined"
import {Link as RouterLink, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";


function Header() {
    const location = useLocation();
    const [page, setPage] = useState(0);

    useEffect(() => {
        if(location.pathname === "/") setPage(0);
        else if (location.pathname === "/reports") setPage(1);
        else if (location.pathname === "/tutorial") setPage(2);
    }, [location.pathname]);
    
    return (
        <AppBar position="sticky"> 
            <Toolbar>
                <Link 
                    variant="h5"
                    component={RouterLink} to ="/"
                    underline="hover" 
                    sx={{display: "flex", alignItems:"center", gap: 1}}
                > 
                    <TimerOutlinedIcon 
                        fontSize="large"
                    /> 
                    Pomotivity
                </Link>
                <Tabs 
                    sx={{mx: "auto"}}
                    value={page}
                    role="navigation"
                >
                    <Tab label="Dashboard" href="/"/>
                    <Tab label="Reports" href="/reports"/>
                    <Tab label="Tutorial" href="/tutorial"/>
                </Tabs>
                <Button variant="outlined" href="/login">Sign Out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header