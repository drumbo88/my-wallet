import React from 'react'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker() {
    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <DatePicker
            label="Fecha"
            format="DD/MM/yyyy"
            value={value}
            onChange={handleChange}
            slotProps={{
                textField: params => ({
                    ...params
                })
            }}
            //render={(params) => <TextField {...params} />}
        />
    )
}