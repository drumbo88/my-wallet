import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import DenseTable from '../components/DenseTable';
import FormDialog from '../components/FormDialog';
import MyDatePicker from '../components/MyDatePicker';
import MyCurrencySelect from '../components/MyCurrencySelect';
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
    { text: 'Fat (g)', align: null, prop: 'fat' },
    { text: 'Carbs (g)', align: 'right', prop: 'carbs' },
    { text: 'Proteins (g)', align: 'right', prop: 'protein' },
]

const addIncomeForm = [
  {
    control: <MyDatePicker />
  },
  {
    style: { width: '14%', marginRight: '1%' },
    control: <MyCurrencySelect />
  },
  {
    style: { width: '85%' },
    control: <>
      <InputLabel htmlFor="amount">Monto</InputLabel>
      <OutlinedInput 
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        fullWidth id="amount" label="Monto" />
    </>
  },
  {
    style: { width: '64%', marginRight: '1%' },
    control: <MyAutocomplete variant="outlined" 
        id="income" label="Item" options={['Sueldo', 'Préstamo', 'Bonificación']} />
  },
  {
    style: { width: '35%' },
    control: <MyAutocomplete variant="outlined" 
        id="origin" label="Origen" options={['Foncap']} />
  },
  {
    control: <>
      <InputLabel htmlFor="detail">Detalle</InputLabel>
      <OutlinedInput 
        fullWidth id="detail" label="Detalle" />
    </>,
  }
]

const IncomesPage = () => {

  const navigate = useNavigate()
  const useOpenIncomeAdd = () => navigate('add')
  const useCloseIncomeAdd = () => navigate('')

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>Ingresos</Typography>
      <Button variant="contained" sx={{ marginBottom: 1 }} onClick={useOpenIncomeAdd}>
        Cargar ingreso
      </Button>
      <Routes><Route path="add" element={<FormDialog title="Cargar ingreso" handleClose={useCloseIncomeAdd}>
        {addIncomeForm.map((item, index) => {
          const style = item.style || {}
          return (
          <FormControl fullWidth={style.width ? null : true} sx={{ my: 1, ...style }} key={index}>
            {item.control}
          </FormControl>
        )})}
      </FormDialog>} /></Routes>
      <DenseTable rows={rows} columns={columns} />
    </div>
  )
}

export default IncomesPage