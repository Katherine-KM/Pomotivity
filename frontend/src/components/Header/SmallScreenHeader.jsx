import {Link, Button, Drawer, List, ListItemButton, ListItemText} from "@mui/material"
import { Link as RouterLink} from "react-router-dom";
import { useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined"
import MenuIcon from "@mui/icons-material/Menu"


export const SmallScreenHeader = ({handleSignOut}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Link
                variant="h5"
                component={RouterLink} to="/"
                underline="hover"
                sx={{ display: "flex", alignItems: "center", gap: 1, mx: "auto"}}
            >
                <TimerOutlinedIcon
                    fontSize="large"
                />
                Pomotivity
            </Link>
            <MenuIcon
                onClick={() => setOpenDrawer(!openDrawer)}
            />  <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{'& .MuiDrawer-paper': {width: 225}}}
            >
                <List>
                    <ListItemButton href="/">
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton href="/reports">
                        <ListItemText>
                            Reports
                        </ListItemText>
                    </ListItemButton>
                    <Button onClick={() => {handleSignOut()}} variant="outlined" href="/login" sx={{marginLeft: 1, mt: 0.5}}>Sign Out</Button>
                </List>
            </Drawer>
        </>
    )
}