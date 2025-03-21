import { useState } from "react";
import Header from "../components/Header/Header"
import { PomodoroCard } from "../components/PomodoroTimer/PomodoroCard";
import { TaskCard } from "../components/Tasks/TaskCard";
import { Box } from "@mui/material";

function Home({today}) {
    const [pomoCompleted, setPomoCompleted] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(1)

    return (
        <>
            <Header />
            <Box
                minHeight="100vh"
                maxWidth="sm"
                marginX="auto"
                sx={{ padding: 5 }}
            >
                <PomodoroCard setPomoCompleted={setPomoCompleted} />
                <TaskCard today = {today} setSelectedTaskId={setSelectedTaskId} pomoCompleted={pomoCompleted} setPomoCompleted={setPomoCompleted} selectedTaskId={selectedTaskId}/>
            </Box>
        </>
    )
}

export default Home