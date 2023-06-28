import * as React from 'react';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';

export default function FormDialog(props) {
  const controls = props.controls || []
  let { id } = useParams();
  return (
    <Dialog open={true} onClose={props.handleClose}>
      <DialogTitle sx={{ fontSize: "1.5em" }}>{props.title + (id ? ' #'+id : '')}</DialogTitle>
      <DialogContent>
        {props.description ? (<DialogContentText>{props.description}</DialogContentText>) : ''}
        {props.children}
        {controls.map((item, index) => {
          const style = item.style || {}
          return (
          <FormControl fullWidth={style.width ? undefined : true} sx={{ my: 1, ...style }} key={index}>
            {item.control}
          </FormControl>
        )})}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="warning" onClick={props.handleClose}>{props.btnCancel ?? 'Cancelar'}</Button>
        <Button variant="contained" onClick={props.handleClose}>{props.btnOk ?? 'Guardar'}</Button>
      </DialogActions>
    </Dialog>
  );
}