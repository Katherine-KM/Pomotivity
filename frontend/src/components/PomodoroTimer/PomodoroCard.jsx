import { useState } from "react";
import { Box, Card } from "@mui/material";
import { PomodoroFooter } from "./PomodoroFooter";
import { PomodoroTimer } from "./PomodoroTimer";
import { PomodoroHeader } from "./PomodoroHeader";
import { Settings } from "./PomodoroTimerSettings";

export const PomodoroCard = () => {
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

    return (
        <>
            <Card sx={{ marginY: 2, padding: 2 }}>
                <PomodoroHeader
                    pomoSessionType={pomoSessionType}
                    setPomoSessionType={setPomoSessionType}
                    setTimeRemaining={setTimeRemaining}
                    focusTime={focusTime}
                    shortBreakTime={shortBreakTime}
                    longBreakTime={longBreakTime}
                />
                <PomodoroTimer
                    timeRemaining={timeRemaining}
                    setTimeRemaining={setTimeRemaining}
                    paused={paused}
                    handleOpenSettings={handleOpenSettings}
                />
                <PomodoroFooter
                    paused={paused}
                    setPaused={setPaused}
                />
            </Card>
            <Settings
                showSettings={showSettings}
                handleCloseSettings={handleCloseSettings}
                setFocusTime={setFocusTime}
                setShortBreakTime={setShortBreakTime}
                setLongBreakTime={setLongBreakTime}
            />
        </>
    )
}