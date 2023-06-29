import { TextField } from "@mui/material";
import { NumericFormatCustom } from "../../utils/NumberFormat";
import { inputSize } from "../../config";

export default function InputAmount(props) {
  return (
    <TextField
      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
      fullWidth
      variant="outlined"
      size={inputSize}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
      }}
      inputProps={{
        sx: {
          textAlign: "right",
          //   "&::placeholder": {
          //     textAlign: "center",
          //   },
        },
      }}
      {...props}
    />
  );
}
