import {TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import React from 'react'
import './filter.css'

export default function TextFilter(prop) {
    const theme = prop.theme && 'darkTheme';
    return (
        <div className="filterOpts" >
            <FormControl variant="standard" sx={{ minWidth: 150,input: { color:prop.theme?"white":"black" } }}>
                <TextField
                    labelId="filterlables"
                    id="loc"
                    style={{color:prop.theme?"white":"black"}}
                    className={`loc`}
                    value={prop.value}
                    label={prop.place}
                    InputLabelProps={{className:`textfield__label__${theme}`}}
                    onChange={(e) => prop.handleChange(e.target.value)}
                />
            </FormControl>
        </div>
    )
}


