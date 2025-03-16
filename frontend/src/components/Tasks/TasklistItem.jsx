import { ListItem, ListItemText, Divider, ListItemIcon, TextField, FormControl, InputLabel, IconButton, Icon} from "@mui/material"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import SettingsIcon from '@mui/icons-material/Settings';

export const TaskListItem = ({task, checked}) => {
    return (
        <>
            <ListItem>
                <ListItemIcon>{checked == false ? (
                    <IconButton>
                        <CheckBoxOutlineBlankIcon/>
                    </IconButton>
                    ) : (
                    <IconButton>
                        <CheckBoxIcon/> 
                    </IconButton>
                    )} 
                </ListItemIcon>
                <ListItemText>{task.title}</ListItemText>
                <ListItemText sx={{maxWidth: 70, borderColor:"pink"}}> 0 / 0</ListItemText>
                <ListItemIcon><IconButton><SettingsIcon/></IconButton></ListItemIcon>
            </ListItem>
            <Divider sx={{backgroundColor: "grey"}}/>
        </>
    )
}
