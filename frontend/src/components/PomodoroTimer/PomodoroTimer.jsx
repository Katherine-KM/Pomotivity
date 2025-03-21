import { Box, Typography, Button} from "@mui/material"
import { useEffect, useState } from "react";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

export const PomodoroTimer = ({
    timeRemaining, 
    setTimeRemaining, 
    paused, 
    setPaused, 
    handleOpenSettings, 
    pomoSessionType, 
    setPomoSessionType, 
    breakCounter, 
    setBreakCounter,
    focusTime,
    shortBreakTime,
    longBreakTime,
    setPomoCompleted
}) => {
    const [minutes, setMinutes] = useState(Math.floor(timeRemaining / 60));
    const [seconds, setSeconds] = useState(Math.floor(timeRemaining % 60));

    useEffect(() => {
        if(!paused && timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining (prevTimeRemaining => prevTimeRemaining - 1); 
            }, 1000)
            return () => clearInterval(interval);
        } else if (!paused && timeRemaining == 0){
            setPaused(true)
            console.log(breakCounter)
            if(pomoSessionType == "Focus Time" && ((breakCounter / 4) != 1) ){
                setPomoSessionType("Short Break")
                setBreakCounter(breakCounter + 1)
                setPomoCompleted(true)
            } else if (pomoSessionType == "Short Break" || pomoSessionType == "Long Break") {
                setPomoSessionType("Focus Time")
            } else {
                setPomoSessionType("Long Break")
                setBreakCounter(1)
                setPomoCompleted(true)
            }
            setTimeRemaining(
                pomoSessionType == "Focus Time" ? focusTime :
                pomoSessionType == "Short Break" ? shortBreakTime :
                longBreakTime
            )
        } else {
            console.log("It is paused")
        }
    },[paused, timeRemaining]);

    useEffect(() => {
        setMinutes(Math.floor(timeRemaining / 60));
        setSeconds(Math.floor(timeRemaining % 60))
    }, [timeRemaining])

    return ( 
        <>
            <Box textAlign={"right"}>
                <Button
                    onClick={handleOpenSettings}
                >
                    <SettingsSuggestIcon fontSize="large"/>
                </Button>
            </Box>
            <Box textAlign="center" paddingBottom={1}>
                <Typography variant="h1" fontWeight={500}>
                    {minutes}:{seconds > 9 ? seconds : `0`+seconds}
                </Typography>
            </Box>
        </>
    )
}