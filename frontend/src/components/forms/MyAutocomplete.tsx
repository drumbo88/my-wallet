import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { inputSize } from '../../config';

const filter = createFilterOptions();

export default function MyAutocomplete(props) {
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

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        size={inputSize}
        //renderOption={(props, option) => [props, option] as React.ReactNode} //<li {...props}>{typeof option != 'object' ? option?.toString() : option?.title}</li>}
        freeSolo
        renderInput={(params) => <TextField required={props.required} label={props.label} {...params} />}
        /*slotProps={{
            textField: params => ({
                label: props.label, ...params
            })
        }}*/
        //renderGroup={(params) => params as unknown as React.ReactNode}
        variant="outlined"
        onChange={(event, newValue: any) => {
            if (typeof newValue === 'string') {
                setValue(newValue);
                // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                title: newValue.inputValue,
                year: '',
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Agregar "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          getOptionLabel={(option: any) => {
              // e.g value selected with enter, right from the input
              if (typeof option === 'string') {
                  return option;
              }
              if (option.inputValue) {
                  return option.inputValue;
              }
              return option.title;
          }}
          {...props}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Nueva opción</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Añadir opción nueva
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value,
                })
              }
              label="year"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
