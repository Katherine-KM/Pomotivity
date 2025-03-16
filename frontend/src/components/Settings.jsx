import { Box, Modal, Typography, TextField, Button } from "@mui/material"

export const Settings = ({
    handleCloseSettings,
    showSettings,
    setFocusTime,
    setShortBreakTime,
    setLongBreakTime
}) => {
    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        
        if(formValues.focusTime != ""){
            setFocusTime(formValues.focusTime * 60);
            localStorage.setItem("focusTime", formValues.focusTime * 60);
        }

        if(formValues.shortBreakTime != ""){
            setShortBreakTime(formValues.shortBreakTime * 60);
            localStorage.setItem("shortBreakTime", formValues.shortBreakTime * 60);
        }

        if(formValues.longBreakTime != ""){
            setLongBreakTime(formValues.longBreakTime * 60)
            localStorage.setItem("longBreakTime", formValues.longBreakTime * 60);;
        }
    }


    return (
        <Modal
        open={showSettings}
        onClose={handleCloseSettings}
    >
        <Box 
            component="form"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: "sm",
                bgcolor: '#323232',
                borderRadius: 2,
                border:2,
                borderColor:"primary.main",
                py: 5,
                px: 10
            }}
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit}
        >
            <Typography textAlign="center" variant="h4" component="h2">
                    Timer Settings
            </Typography>
            <Box 
                display="flex"
                gap={2}
                sx={{mb:4, mt:3}}
            >
                <TextField
                    label="Focus Time"
                    name = "focusTime"
                    variant="filled"
                    type="number"
                />
                <TextField
                    label="Short Break"
                    name = "shortBreakTime"
                    variant="filled"
                    type="number"
                />
                <TextField
                    label="Long Break"
                    name = "longBreakTime"
                    variant="filled"
                    type="number"
                />
            </Box>
            <Button 
                type="Submit"
                variant="contained"
                size="large"
                sx={{color: "white"}}
            >
                Submit
            </Button>
        </Box>
    </Modal>
    )
}