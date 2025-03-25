import { ListItem, ListItemText, Divider, ListItemIcon, TextField, FormControl, InputLabel, IconButton, Icon, Box, Button } from "@mui/material"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from "react";
import { UpdateTask } from "./UpdateTask";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';

export const TaskListItem = ({ task, fetchTasks, setSelectedTaskId, selectedTaskId, pomoCompleted, setPomoCompleted }) => {
    const [isUpdatingTask, setIsUpdatingTask] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        id: task.id,
        title: task.title,
        estimatedPomodoros: task.estimatedPomodoros,
        dueDate: task.dueDate,
        completed: task.completed,
        actualPomodoros: task.actualPomodoros,
        taskType: task.taskType,
        priorityLevel: task
    })

    const handleDelete = () => {
        axios.delete(`https://pomotivity-latest.onrender.com/api/v1/tasks/${task.id}`, { withCredentials: true })
            .then(res => fetchTasks())
            .catch(err => console.log(err))
    }

    const handleUpdate = (task) => {
        const updateTask = { ...task, completed: !task.completed }
        setUpdatedTask({ ...updatedTask, completed: !updatedTask.completed })
        axios.put("https://pomotivity-latest.onrender.com/api/v1/tasks", updateTask, { withCredentials: true })
            .then(res => fetchTasks())
            .catch(err => console.log(err))
    }

    const handleSelection = (taskId) => {
        setSelectedTaskId(taskId)
    }

    useEffect(() => {
        if (pomoCompleted == true && task.id == selectedTaskId) {
            const updated = { ...task, actualPomodoros: task.actualPomodoros + 1 };
            axios.put("https://pomotivity-latest.onrender.com/api/v1/tasks", updated, { withCredentials: true })
                .then(res => fetchTasks())
                .catch(err => console.log(err))
                .finally(() => setPomoCompleted(false));
        }
    }, [pomoCompleted, selectedTaskId])

    return (
        <Box sx={{
            borderColor: task.id === selectedTaskId ? "secondary.main" : "transparent",
            backgroundColor: task.id === selectedTaskId ? "#2d2d2d" : "transparent",
            borderStyle: "solid",
            borderWidth: 2,
            borderRadius: 2,
            "&:hover": { backgroundColor: "#2D2D2D", cursor: "pointer" }
        }}>
            <ListItem onClick={() => handleSelection(task.id)}>
                <Checkbox checked={task.completed} onChange={() => handleUpdate(task)} />
                <ListItemText sx={{ wordBreak: "break-word" }}>{task.title}</ListItemText>
                {task.taskType === "PriorityTask" &&
                    <ListItemText sx={{ wordBreak: "break-word", display: { xs: "none", sm: "inherit"}}}>Priority: {task.priorityLevel}</ListItemText>
                }
                <ListItemText sx={{ maxWidth: 70 }}> {`${task.actualPomodoros}/${task.estimatedPomodoros}`}</ListItemText>
                <ListItemIcon sx={{marginLeft: "auto"}}>
                    <IconButton onClick={() => setIsUpdatingTask(true)}>
                        <SettingsIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon sx={{ display: { xs: "none", sm: "inherit" }}}>
                    <IconButton onClick={() => { handleDelete() }}>
                        <DeleteForeverIcon />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <UpdateTask
                task={task}
                isUpdatingTask={isUpdatingTask}
                setIsUpdatingTask={setIsUpdatingTask}
                fetchTasks={fetchTasks}
                handleDelete={handleDelete}
            />
            <Divider sx={{ backgroundColor: "grey" }} />
        </Box>
    )
}
