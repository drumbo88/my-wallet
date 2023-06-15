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
const Button_1 = __importDefault(require("@mui/material/Button"));
//import TextField from '@mui/material/TextField';
const material_1 = require("@mui/material");
const Dialog_1 = __importDefault(require("@mui/material/Dialog"));
const DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
const DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
const DialogContentText_1 = __importDefault(require("@mui/material/DialogContentText"));
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const react_router_dom_1 = require("react-router-dom");
function FormDialog(props) {
    var _a, _b;
    const controls = props.controls || [];
    let { id } = (0, react_router_dom_1.useParams)();
    return (<Dialog_1.default open={true} onClose={props.handleClose}>
      <DialogTitle_1.default>{props.title + (id ? ' #' + id : '')}</DialogTitle_1.default>
      <DialogContent_1.default>
        {props.description ? (<DialogContentText_1.default>{props.description}</DialogContentText_1.default>) : ''}
        {props.children}
        {controls.map((item, index) => {
            const style = item.style || {};
            return (<material_1.FormControl fullWidth={style.width ? undefined : true} sx={Object.assign({ my: 1 }, style)} key={index}>
            {item.control}
          </material_1.FormControl>);
        })}
      </DialogContent_1.default>
      <DialogActions_1.default>
        <Button_1.default variant="outlined" color="warning" onClick={props.handleClose}>{(_a = props.btnCancel) !== null && _a !== void 0 ? _a : 'Cancelar'}</Button_1.default>
        <Button_1.default variant="contained" onClick={props.handleClose}>{(_b = props.btnOk) !== null && _b !== void 0 ? _b : 'Guardar'}</Button_1.default>
      </DialogActions_1.default>
    </Dialog_1.default>);
}
exports.default = FormDialog;
