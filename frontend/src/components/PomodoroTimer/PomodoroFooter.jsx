import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { Button, Typography, Box } from '@mui/material';

export const PomodoroFooter = ({paused, setPaused}) => {
    const handleClick = () => {
        setPaused(prevPaused => !prevPaused); 
    }

    return(
        <Box padding={2} display="flex" justifyContent="center">
            {paused == false ?  (
                <Button 
                    variant='outlined'
                    size="large" 
                    onClick={handleClick}
                >
                    <PauseCircleIcon fontSize='large'/>
                    <Typography sx={{paddingLeft:1}}> Pause </Typography>
                </Button>
            ) :
            (
                <Button
                    variant='outlined'
                    size="large" 
                    onClick={handleClick}
                >
                    <PlayCircleIcon fontSize='large'/>
                    <Typography sx={{paddingLeft:1}}> Start </Typography>
                </Button>
            )}
        </Box>
    )
}