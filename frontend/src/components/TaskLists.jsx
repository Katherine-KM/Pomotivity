import { List } from "@mui/material"
import { TaskListItem } from "./TasklistItem"
export const TaskLists = ({tasks}) => {

    return(
        <List>
            {tasks.map((task) => (
                <TaskListItem key={task.id} task = {task} checked={true}/>
            ))}
        </List>
    )
}