import React from 'react'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { inputSize } from '../config';

export default function MyDatePicker() {
    const [value, setValue] = React.useState(moment('2022-04-17'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
            label="Fecha"
            format="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            slotProps={{
                textField: params => ({
                    ...params,
                    size: inputSize
                })
            }}
            //render={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    )
}