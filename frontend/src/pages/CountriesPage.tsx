import axios from 'axios'
import { Button, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridRowModel } from '@mui/x-data-grid';
import FormDialog from '../components/FormDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MyCurrencySelect from '../components/MyCurrencySelect';

const formControls = [
  {
    style: { width: '19%', marginRight: '1%' },
    control: <>
      <InputLabel htmlFor="code">Código</InputLabel>
      <OutlinedInput
        fullWidth id="code" label="Código" />
    </>,
  },
  {
    style: { width: '80%' },
    control: <>
      <InputLabel htmlFor="nombre">Nombre</InputLabel>
      <OutlinedInput
        fullWidth id="nombre" label="Nombre" />
    </>
  },
  {
    control: <MyCurrencySelect />
  },
]

const CountriesPage = () => {

  const [data, setData] = useState<any[]>([])

  const navigate = useNavigate()
  const openForm = (id?) => {
    console.log(id)
    navigate('form/'+(id ?? ''))
  }
  const closeForm = () => navigate('')

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3080/api/country');
      setData(data.countries)
    }
    fetchData().catch(err => console.error(err))
  }, [])
  const columns = [{
    field: 'code',
    headerName: 'Código',
    width: 100
  },{
    field: 'name',
    headerName: 'Nombre',
    flex: 1
  },{
    field: 'currencies',
    headerName: 'Monedas',
    flex: 1
  },{
    field: 'actions',
    headerName: 'Acciones',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<EditIcon />} onClick={()=>openForm(params.row.code)} label="Edit" />,
      <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
    ]
  }]

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Países
      </Typography>
      <Button variant="contained" sx={{ marginY: 2 }} onClick={()=>openForm()}>
        Cargar país
      </Button>
      <Routes>
        <Route path="form">
          <Route path=":id" element={<FormDialog title="Modificar país" controls={formControls} handleClose={closeForm} />} />
          <Route path="" element={<FormDialog title="Cargar país" controls={formControls} handleClose={closeForm} />} />
        </Route>
      </Routes>
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={row=>row._id}
          rows={data}
          columns={columns}
          initialState={{pagination: { paginationModel: { pageSize: 8 }}}}
          pageSizeOptions={[8, 15, 25]}
          density="compact"
          autoHeight
        />
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>
  )
}

export default CountriesPage