import { Card } from "@mui/material"
import { TaskLists } from "./TaskLists"
import { useState, useEffect } from "react";
import axios from "axios";
import { AddTask } from "./AddTask";

export const TaskCard = ({today, setSelectedTaskId, selectedTaskId, pomoCompleted, setPomoCompleted}) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get("https://pomotivity-latest.onrender.com/api/v1/tasks", { withCredentials: true })
            .then((res) => {
                const sortedTasks = [...res.data].sort((a,b) => a.id - b.id);
                setTasks(sortedTasks);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <Card sx={{ padding: 2 }}>
            <AddTask today = {today} fetchTasks = {fetchTasks} setTasks = {setTasks} tasks = {tasks} /> 
            <TaskLists tasks={tasks} fetchTasks = {fetchTasks} setSelectedTaskId={setSelectedTaskId} selectedTaskId={selectedTaskId} pomoCompleted={pomoCompleted} setPomoCompleted={setPomoCompleted} />
        </Card>
    )
}