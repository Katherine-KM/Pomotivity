import Header from "../components/Header"
import { TaskLists } from "../components/TaskLists";
import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Container, Box, Card } from "@mui/material";
import { Pomodoro } from "../components/Pomodoro";;

function Home() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get("http://localhost:8080/api/v1/tasks", { withCredentials: true})
            .then((res) => {
                setTasks(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchTasks()
    },[])

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <>
        <Header/>
        <Box
            minHeight="100vh"
            maxWidth="sm"
            marginX="auto"
            sx={{padding: 5}}
        >
                <Card sx={{marginY: 2, padding:2}}>
                    <Pomodoro />
                </Card>
                <Card sx={{padding: 2}}>
                    
                    <TaskLists tasks={tasks} checked={false} />
                </Card>
        </Box>
        </>
    )
}

export default Home