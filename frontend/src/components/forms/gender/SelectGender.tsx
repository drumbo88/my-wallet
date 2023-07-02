import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { inputSize } from "../../../config";
import { PersonGenders } from "common/types/person"

const genders = Object.entries(PersonGenders).map(([key, value]) => ({
    value, label: key,
}));

export default function SelectGender(props) {
  const [gender, setGender] = React.useState(genders[0].value);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <TextField
      select
      label="Género"
      value={gender}
      onChange={handleChange}
      size={inputSize}
      {...props}
    >
      {genders.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
