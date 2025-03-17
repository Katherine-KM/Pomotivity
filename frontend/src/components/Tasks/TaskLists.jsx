import { List } from "@mui/material"
import { TaskListItem } from "./TasklistItem"
export const TaskLists = ({tasks, fetchTasks }) => {

    return(
        <List>
            {tasks.map((task) => (
                <TaskListItem key={task.id} task = {task} checked={true} fetchTasks = {fetchTasks} />
            ))}
        </List>
    )
}