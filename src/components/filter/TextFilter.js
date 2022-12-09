import { InputLabel, MenuItem, TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import React from 'react'
import './filter.css'

export default function TextFilter(prop) {
    const theme = prop.theme && 'darkTheme';
    return (
        <div className="filterOpts" >
            <FormControl variant="standard" sx={{ minWidth: 150 }}>
                <TextField
                    labelId="filterlables"
                    id="loc"
                    className='loc'
                    value={prop.value}
                    label={prop.place}
                    onChange={(e) => prop.handleChange(e.target.value)}
                />
            </FormControl>
        </div>
    )
}


