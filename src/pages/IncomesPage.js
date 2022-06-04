import { FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React from 'react'
import DenseTable from '../components/DenseTable';
import FormDialog from '../components/FormDialog';
import MyAutocomplete from '../components/MyAutocomplete';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const columns = [
    { text: 'Dessert (100g serving)', prop: 'name' },
    { text: 'Calories', align: 'right', prop: 'calories' },
    { text: 'Fat (g)', align: '', prop: 'fat' },
    { text: 'Carbs (g)', align: 'right', prop: 'carbs' },
    { text: 'Proteins (g)', align: 'right', prop: 'protein' },
]

const IncomesPage = () => {
  return (
    <div>
      <Typography variant="h4" marginBottom={1}>Ingresos</Typography>
      <FormDialog title="Cargar ingreso">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="amount">Monto</InputLabel>
          <OutlinedInput 
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            fullWidth id="amount" label="Monto" />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          {/*<InputLabel htmlFor="income">Item</InputLabel>*/}
          <MyAutocomplete variant="outlined"
            fullWidth id="income" label="Item" options={['hola', 'prueba', 'otro']} />
        </FormControl>
      </FormDialog>
      <DenseTable rows={rows} columns={columns} />
    </div>
  )
}

export default IncomesPage