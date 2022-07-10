import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function MyCurrencySelect() {
  const [currency, setCurrency] = React.useState('USD');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <TextField
        select
        label="Moneda"
        value={currency}
        onChange={handleChange}
    >
        {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
        ))}
    </TextField>
  );
}
