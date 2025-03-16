import Header from "../components/Header"
import { TaskLists } from "../components/TaskLists";
import { useState, useEffect } from "react";
import axios from "axios";
import {Box, Card} from "@mui/material";
import { PomodoroHeader } from "../components/PomodoroHeader";
import { PomodoroTimer } from "../components/PomodoroTimer";
import { PomodoroFooter } from "../components/PomodoroFooter";
import { Settings } from "../components/Settings";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [pomoSessionType, setPomoSessionType] = useState("Focus Time");
    const [focusTime, setFocusTime] = useState(() => Number(localStorage.getItem("focusTime")) || 1500);
    const [shortBreakTime, setShortBreakTime] = useState(() => Number(localStorage.getItem("shortBreakTime")) || 300);
    const [longBreakTime, setLongBreakTime] = useState(() => Number(localStorage.getItem("longBreakTime")) || 900);
    const [paused, setPaused] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(
            pomoSessionType == "Focus Time" ? focusTime :
            pomoSessionType == "Short Break" ? shortBreakTime :
            longBreakTime
    );
    const [showSettings, setShowSettings] = useState(false)
 
    const handleCloseSettings = () => {
        setShowSettings(false);
    }

    const handleOpenSettings = () => {
        setShowSettings(true);
    }

    const fetchTasks = () => {
        axios.get("http://localhost:8080/api/v1/tasks", { withCredentials: true})
            .then((res) => {
                setTasks(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchTasks()
    },[])

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <>
        <Header/>
        <Box
            minHeight="100vh"
            maxWidth="sm"
            marginX="auto"
            sx={{padding: 5}}
        >
                <Card sx={{marginY: 2, padding:2}}>
                    <PomodoroHeader 
                        pomoSessionType = {pomoSessionType}
                        setPomoSessionType = {setPomoSessionType}
                        setTimeRemaining = {setTimeRemaining}
                        focusTime = {focusTime}
                        shortBreakTime = {shortBreakTime}
                        longBreakTime = {longBreakTime}
                    />
                    <PomodoroTimer 
                        timeRemaining = {timeRemaining}
                        setTimeRemaining = {setTimeRemaining}
                        paused = {paused}
                        handleOpenSettings = {handleOpenSettings}
                    />
                    <PomodoroFooter 
                        paused = {paused}
                        setPaused = {setPaused}
                    />
                </Card>
                <Card sx={{padding: 2}}>
                    <TaskLists tasks={tasks} checked={false} />
                </Card>
                <Settings 
                    showSettings = {showSettings}
                    handleCloseSettings = {handleCloseSettings}
                    setFocusTime={setFocusTime}
                    setShortBreakTime={setShortBreakTime}
                    setLongBreakTime={setLongBreakTime}
                />
        </Box>
        </>
    )
}

export default Home