import { Card } from "@mui/material"
import { TaskLists } from "./TaskLists"
import { useState, useEffect } from "react";
import axios from "axios";
import { AddTask } from "./AddTask";

export const TaskCard = ({today}) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get("http://localhost:8080/api/v1/tasks", { withCredentials: true })
            .then((res) => {
                setTasks(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <Card sx={{ padding: 2 }}>
            <AddTask today = {today} fetchTasks = {fetchTasks} setTasks = {setTasks} tasks = {tasks} /> 
            <TaskLists tasks={tasks} checked={false}  fetchTasks = {fetchTasks}  />
        </Card>
    )
}