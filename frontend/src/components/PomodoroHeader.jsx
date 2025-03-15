import { Paper, Tab, Tabs } from "@mui/material"

export const PomodoroHeader = ({
    pomoSessionType, 
    setPomoSessionType,
    setTimeRemaining, 
    focusTime, 
    shortBreakTime, 
    longBreakTime
}) => {

    const handleChange = (e, value) => {
        setPomoSessionType(value)
        setTimeRemaining(
            value == "Focus Time" ? focusTime :
            value == "Short Break" ? shortBreakTime :
            longBreakTime
        )
    }

    return (
        <Tabs
            variant="fullWidth"
            onChange={handleChange}
            value={pomoSessionType}
        >
            <Tab value="Focus Time" label="Focus Time"/>
            <Tab value="Short Break" label="Short Break" />
            <Tab value="Long Break" label="Long Break" />
        </Tabs>
    )
}