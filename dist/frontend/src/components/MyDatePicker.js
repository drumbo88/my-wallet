"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const MobileDatePicker_1 = require("@mui/x-date-pickers/MobileDatePicker");
function MyDatePicker() {
    const [value, setValue] = react_1.default.useState(new Date());
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (<MobileDatePicker_1.MobileDatePicker label="Fecha" inputFormat="DD/MM/yyyy" value={value} onChange={handleChange} renderInput={(params) => <TextField_1.default {...params}/>}/>);
}
exports.default = MyDatePicker;
