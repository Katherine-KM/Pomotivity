import { List } from "@mui/material"
import { TaskListItem } from "./TasklistItem"
export const TaskLists = ({tasks, fetchTasks, setSelectedTaskId, selectedTaskId, pomoCompleted, setPomoCompleted}) => {

    return(
        <List>
            {tasks.map((task) => (
                <TaskListItem key={task.id} task = {task} fetchTasks = {fetchTasks} setSelectedTaskId={setSelectedTaskId} selectedTaskId={selectedTaskId} pomoCompleted={pomoCompleted} setPomoCompleted={setPomoCompleted} />
            ))}
        </List>
    )
}