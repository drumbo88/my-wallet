import { TextField } from "@mui/material";
import { inputSize } from "../../config";

export default function InputText(props) {
  return (
    <TextField
        fullWidth
        variant="outlined"
        size={inputSize}
        {...props}
        multiline={false}
      />
  );
}
