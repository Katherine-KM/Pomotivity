import { ListItem, ListItemText, Divider, ListItemIcon, TextField, FormControl, InputLabel, IconButton, Icon, Box} from "@mui/material"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { UpdateTask } from "./UpdateTask";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

export const TaskListItem = ({task, checked, fetchTasks}) => {
    const [isUpdatingTask, setIsUpdatingTask] = useState(false);

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/v1/tasks/${task.id}`, { withCredentials: true })
        .then(res => fetchTasks())
        .catch(err => console.log(err))
    }

    return (
        <Box>
            <ListItem>
                <ListItemIcon>
                    <IconButton> {checked ? <CheckBoxIcon/>  : <CheckBoxOutlineBlankIcon/>} </IconButton>
                </ListItemIcon>
                <ListItemText>{task.title}</ListItemText>
                <ListItemText sx={{maxWidth: 70, borderColor:"pink"}}> 0 / 0</ListItemText>
                <ListItemIcon>
                    <IconButton onClick={() => setIsUpdatingTask(true)}>
                        <SettingsIcon/>
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={() => {handleDelete()}}>
                        <DeleteForeverIcon />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <UpdateTask
                task={task}
                isUpdatingTask = {isUpdatingTask}
                setIsUpdatingTask = {setIsUpdatingTask}
                fetchTasks = {fetchTasks} 
            />
            <Divider sx={{backgroundColor: "grey"}}/>
        </Box>
    )
}
