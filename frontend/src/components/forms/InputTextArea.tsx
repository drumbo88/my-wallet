import { TextField } from "@mui/material";
import { inputSize } from "../../config";

export default function InputTextArea(props) {
  return (
    <TextField
        multiline={true}
        minRows={2.5}
        maxRows={2.5}
        fullWidth
        variant="outlined"
        size={inputSize}
        {...props}
      />
  );
}
