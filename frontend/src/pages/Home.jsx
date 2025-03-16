import Header from "../components/Header/Header"
import { PomodoroCard } from "../components/PomodoroTimer/PomodoroCard";
import { TaskCard } from "../components/Tasks/TaskCard";
import { Box } from "@mui/material";

function Home() {
    return (
        <>
            <Header />
            <Box
                minHeight="100vh"
                maxWidth="sm"
                marginX="auto"
                sx={{ padding: 5 }}
            >
                <PomodoroCard />
                <TaskCard />
            </Box>
        </>
    )
}

export default Home