import { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dayjs from "dayjs";
import axios from "axios";

export const UpdateTask = ({ task, isUpdatingTask, setIsUpdatingTask, fetchTasks, handleDelete }) => {
     const [updatedTask, setUpdatedTask] = useState({
        id: task.id,
        title: task.title,
        estimatedPomodoros: task.estimatedPomodoros,
        dueDate: task.dueDate,
        completed: task.completed,
        actualPomodoros: task.actualPomodoros,
        taskType: task.taskType,
        priorityLevel: task.TaskType
    })

    const handleInput = (e) => {
        setUpdatedTask({...updatedTask, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8080/api/v1/tasks", updatedTask, { withCredentials: true })
            .then(res => fetchTasks())
            .catch(err => console.log(err))
        setIsUpdatingTask(false);
    }


    return (
        <>
            {isUpdatingTask && (
                <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                onSubmit={handleSubmit}
                >
                    <Typography textAlign="center" variant="h4" component="h2">
                        Update Task
                    </Typography>
                    <Box
                        display="flex"
                        gap={2}
                        sx={{ mb: 4, mt: 3 }}
                        width="100%"
                        flexWrap="wrap"
                    >
                        <TextField
                            id="taskTitle"
                            name="title"
                            variant="filled"
                            label="Task Title"
                            sx={{ flexBasis: {xs: "100%", sm:"48%"} }}
                            onChange={handleInput}
                            required
                            defaultValue={task.title}
                        />
                        <TextField
                            id="estimatedPomodoros"
                            name="estimatedPomodoros"
                            label="Est. Pomodoros"
                            variant="filled"
                            type="number"
                            sx={{ flexBasis: {xs: "100%", sm:"48%"} }}
                            onChange={handleInput}
                            required
                            defaultValue={task.estimatedPomodoros}
                        />

                        <DatePicker
                            label="Due Date"
                            name="dueDate"
                            sx={{ flexBasis: {xs: "100%", sm:"50%"} }}
                            onChange={(updatedValue) => setUpdatedTask({ ...updatedTask, dueDate: dayjs(updatedValue).format("MM/DD/YY") })}
                            isRequired
                            defaultValue={task.dueDate ? dayjs(task.dueDate, "MM/DD/YY") : null}
                        />

                        <Button
                            type="Submit"
                            variant="contained"
                            size="large"
                            sx={{ color: "white", flexBasis: {xs: "100%", sm:"48%"} }}
                        >
                            Update Task
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ color: "white", flexBasis: {xs: "100%", sm:"48%"} }}

                            onClick={() => setIsUpdatingTask(false)}
                        >
                            Cancel
                        </Button>

                        
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ color: "white", flexBasis: {xs: "100%"}, display: {xs: "block", sm: "none"}}}

                            onClick={() => handleDelete()}
                        >
                            Delete Task
                        </Button>

                    </Box>
                </Box>

            )
            }
        </>
    )
}