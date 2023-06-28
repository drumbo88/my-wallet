import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { inputSize } from "../config";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export default function MyCurrencySelect() {
  const [currency, setCurrency] = React.useState("USD");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <TextField
      select
      label="Moneda"
      value={currency}
      onChange={handleChange}
      size={inputSize}
      inputProps={{
        sx: {
          textAlign: "center",
        //   "&::placeholder": {
        //     textAlign: "center",
        //   },
        },
      }}
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ justifyContent: "center" }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
