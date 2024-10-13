import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function TasksList({ tasks, onCompleted }) {
    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {tasks && tasks.map((task, index) => {
                    return <ListItem key={task.id} style={{backgroundColor: task.completed? "#b0cde4" : "", borderRadius:"8px", outline: "1px solid #ccc", marginBottom: "8px"}}>
                        <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={task.name} style={{wordWrap: "break-word", width: "0"}}/>
                        <Button style={{display: "inline-block"}} variant="contained" onClick={() => onCompleted(task.id)}>Completed</Button>
                    </ListItem>
                })}
            </List>
        </div>
    )
}
