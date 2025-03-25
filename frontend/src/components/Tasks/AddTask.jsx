import { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs";
import axios from "axios";

export const AddTask = ({today, fetchTasks}) => {
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTask, setNewTask] = useState({
        title: "",
        estimatedPomodoros: 0,
        dueDate: today,
        taskType: "Task",
        priorityLevel: null
    })
    const [isPriorityTask, setIsPriorityTask] = useState(false)

    const handleInput = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const addedTask = !isPriorityTask ? {...newTask, tasktype: "Task"} : {...newTask, taskType:"Priority Task"}
        addTask(addedTask)
        setIsAddingTask(false);
        setIsPriorityTask(false);
    }

    const addTask = (addedTask) => {
        axios.post("https://pomotivity-latest.onrender.com/api/v1/tasks", addedTask, { withCredentials: true })
            .then(res => fetchTasks())
            .catch(err => console.log(err))
    }

    return (
        <>
            {isAddingTask ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Typography textAlign="center" variant="h4" component="h2">
                        Add Task
                    </Typography>
                    <Box
                        display="flex"
                        gap={2}
                        sx={{ mb: 4, mt: 3 }}
                        flexWrap="wrap"
                        width="100%"
                    >
                        <TextField
                            id="taskTitle"
                            name="title"
                            variant="filled"
                            label="Task Title"
                            onChange={handleInput}
                            required
                            sx={{flexBasis: {xs: "100%", sm:"48%"}}}
                        />
                        <TextField
                            id="estimatedPomodoros"
                            name="estimatedPomodoros"
                            label="Est. Pomodoros"
                            variant="filled"
                            type="number"
                            onChange={handleInput}
                            sx={{flexBasis: {xs: "100%", sm:"48%"}}}
                            required
                        />

                        <DatePicker
                            label="Due Date"
                            name="dueDate"
                            onChange={(newValue) => setNewTask({...newTask, dueDate: dayjs(newValue).format("MM/DD/YY")})}
                            isRequired
                            sx={{flexBasis: {xs: "100%", sm:"48%"}}}
                        /> 
                        <span>
                            <Typography display="inline"> Is this Task a Priority? </Typography>
                            <Button onClick={() => {
                                setIsPriorityTask(prev => !prev);
                            }}> 
                                {isPriorityTask ? <CheckBoxIcon />  : <CheckBoxOutlineBlankIcon/>} 
                            </Button>
                        </span>

                        {isPriorityTask && 
                            <TextField 
                                name="priorityLevel"
                                variant="filled"
                                type="number" 
                                label="Priority Level" 
                                sx={{flexBasis: {xs: "100%", sm:"50%"}}} 
                                required
                                onChange={(e) => setNewTask({
                                    ...newTask, 
                                    priorityLevel: Number(e.target.value)
                                })}
                            />
                        }

                        <Button
                            type="Submit"
                            variant="contained"
                            size="large"
                            sx={{ color: "white", flexBasis: {xs: "100%", sm:"48%"} }}
                            onSubmit={handleSubmit}
                        >
                            Create Task
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{ color: "white", flexBasis: {xs: "100%", sm:"48%"} }}

                            onClick={() => setIsAddingTask(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>

            ) : (
                <Box
                    textAlign="center"
                    sx={{
                        border: "2px dashed",
                        borderColor:"primary.main",
                        padding:1
                    }}
                > 
                    <Button onClick={() => setIsAddingTask(true)}> <AddIcon> </AddIcon> Add Task </Button>
                </Box>
                )
            }


        </>
    )
}