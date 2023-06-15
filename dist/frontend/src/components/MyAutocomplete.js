"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const Dialog_1 = __importDefault(require("@mui/material/Dialog"));
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
const DialogContentText_1 = __importDefault(require("@mui/material/DialogContentText"));
const DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Autocomplete_1 = __importStar(require("@mui/material/Autocomplete"));
const filter = (0, Autocomplete_1.createFilterOptions)();
function MyAutocomplete(props) {
    const [value, setValue] = React.useState(props.options[0]);
    const [open, toggleOpen] = React.useState(false);
    const handleClose = () => {
        setDialogValue({
            title: '',
            year: '',
        });
        toggleOpen(false);
    };
    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        setValue({
            title: dialogValue.title,
            year: parseInt(dialogValue.year, 10),
        });
        handleClose();
    };
    return (<React.Fragment>
      <Autocomplete_1.default value={value} selectOnFocus clearOnBlur handleHomeEndKeys renderOption={(props, option) => [props, option]} //<li {...props}>{typeof option != 'object' ? option?.toString() : option?.title}</li>}
     freeSolo renderInput={(params) => <TextField_1.default {...params} label={props.label}/>} variant="outlined" onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
                setValue(newValue);
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                    /*toggleOpen(true);
                    setDialogValue({
                      title: newValue,
                      year: '',
                    });*/
                });
            }
            else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setDialogValue({
                    title: newValue.inputValue,
                    year: '',
                });
            }
            else {
                console.log(newValue);
                setValue(newValue);
            }
        }} filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== '') {
                filtered.push({
                    inputValue: params.inputValue,
                    title: `Agregar "${params.inputValue}"`,
                });
            }
            return filtered;
        }} getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.title;
        }} {...props}/>
      <Dialog_1.default open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle_1.default>Add a new film</DialogTitle_1.default>
          <DialogContent_1.default>
            <DialogContentText_1.default>
              Añadir opción nueva
            </DialogContentText_1.default>
            <TextField_1.default autoFocus margin="dense" id="name" value={dialogValue.title} onChange={(event) => setDialogValue(Object.assign(Object.assign({}, dialogValue), { title: event.target.value }))} label="title" type="text" variant="standard"/>
            <TextField_1.default margin="dense" id="name" value={dialogValue.year} onChange={(event) => setDialogValue(Object.assign(Object.assign({}, dialogValue), { year: event.target.value }))} label="year" type="number" variant="standard"/>
          </DialogContent_1.default>
          <DialogActions_1.default>
            <Button_1.default onClick={handleClose}>Cancel</Button_1.default>
            <Button_1.default type="submit">Add</Button_1.default>
          </DialogActions_1.default>
        </form>
      </Dialog_1.default>
    </React.Fragment>);
}
exports.default = MyAutocomplete;
