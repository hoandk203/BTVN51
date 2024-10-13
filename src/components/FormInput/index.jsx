import React from 'react'
import {TextField, Button} from '@mui/material';

export default function FormInput({ onInput, onSave, task }) {
  return (
        <div>
            <TextField
                type="text"
                name="name"
                value={task.name}
                onChange={onInput}
                required
                id="outlined-required"
                label="Name"
            />
            <Button onClick={onSave} variant="contained" color="success" style={{height: "56px", display: "inline-block", marginLeft:"8px"}}>Save</Button>
        </div>
    )
}
