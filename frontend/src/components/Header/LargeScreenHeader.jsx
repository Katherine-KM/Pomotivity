import {Link, Tabs, Tab, Button} from "@mui/material"
import { Link as RouterLink} from "react-router-dom";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined"

export const LargeScreenHeader = ({page}) => {
    return (<>
        <Link
            variant="h5"
            component={RouterLink} to="/"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
            <TimerOutlinedIcon
                fontSize="large"
            />
            Pomotivity
        </Link>
        <Tabs
            sx={{ mx: "auto" }}
            value={page}
            role="navigation"
        >
            <Tab label="Dashboard" href="/" />
            <Tab label="Reports" href="/reports" />
            <Tab label="Tutorial" href="/tutorial" />
        </Tabs>
        <Button variant="outlined" href="/login">Sign Out</Button></>)
}