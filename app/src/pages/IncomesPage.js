import { Button, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import FormDialog from '../components/FormDialog';
import MyDatePicker from '../components/MyDatePicker';
import MyCurrencySelect from '../components/MyCurrencySelect';
import MyAutocomplete from '../components/MyAutocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const incomeForm = [
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
        //startAdornment={<InputAdornment position="start">$</InputAdornment>}
        fullWidth id="amount" label="Monto" />
    </>
  },
  {
    control: <MyAutocomplete variant="outlined" 
        id="income" label="Concepto" options={['Sueldo', 'Préstamo', 'Bonificación']} />
  },
  {
    style: { width: '49%', marginRight: '1%' },
    control: <MyAutocomplete variant="outlined" 
        id="from" label="Origen" options={['Foncap','Otro']} />
  },
  {
    style: { width: '50%' },
    control: <MyAutocomplete variant="outlined" 
        id="to" label="Destino" options={['BBVA C/A']} />
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
  const openIncomeForm = (id) => navigate('form/'+(id ?? ''))
  const closeIncomeForm = () => navigate('')

  let ID = 0
  function createData(name, calories, fat, carbs, proteins) {
      const id = ++ID
      return { id, name, calories, fat, carbs, proteins };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const columns = /*[
    { text: 'Dessert (100g serving)', prop: 'name' },
    { text: 'Calories', align: 'right', prop: 'calories' },
    { text: 'Fat (g)', align: null, prop: 'fat' },
    { text: 'Carbs (g)', align: 'right', prop: 'carbs' },
    { text: 'Proteins (g)', align: 'right', prop: 'protein' },
  ]*/
  [{ 
    field: 'id', 
    headerName: 'ID', 
    width: 50
  },{
    field: 'name',
    headerName: 'Dessert (100g serving)',
    flex: 1
  },{
    field: 'calories',
    headerName: 'Calories',
    type: 'number',
    flex: 1
  },{
    field: 'fat',
    headerName: 'Fat (g)',
    type: 'number',
    flex: 1
  },{
    field: 'carbs',
    headerName: 'Carbs (g)',
    type: 'number',
    flex: 1
  },{
    field: 'proteins',
    headerName: 'Proteins (g)',
    type: 'number',
    flex: 1
  },{
    field: 'actions',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<EditIcon />} onClick={()=>openIncomeForm(params.id)} label="Edit" />,
      <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
    ]
  }]

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Ingresos
      </Typography>
      <Button variant="contained" sx={{ marginY: 2 }} onClick={()=>openIncomeForm()}>
        Cargar ingreso
      </Button>
      <Routes>
        <Route path="form">
          <Route path=":id" element={<FormDialog title="Modificar ingreso" controls={incomeForm} handleClose={closeIncomeForm} />} />
          <Route path="" element={<FormDialog title="Cargar ingreso" controls={incomeForm} handleClose={closeIncomeForm} />} />
        </Route>
      </Routes>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          density="compact"
          autoHeight
        />
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>
  )
}

export default IncomesPage