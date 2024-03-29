import axios from 'axios'
import { Button, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import FormDialog from '../components/FormDialog';
import MyAutocomplete from '../components/forms/MyAutocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import InputText from 'components/forms/InputText';
import InputTextArea from 'components/forms/InputTextArea';

const currencyForm = [
  {
    style: { width: '19%', marginRight: '1%' },
    control: <InputText required label="Símbolo" id="symbol" />,
  },
  {
    style: { width: '80%' },
    control: <InputText required label="Nombre" id="name" />,
  },
  {
    style: { width: '49%', marginRight: '1%' },
    control: <MyAutocomplete required
        id="from" label="Tipo" options={['FIAT','CRYPTO']} />
  },
  {
    style: { width: '50%' },
    control: <MyAutocomplete required
        id="to" label="País" options={['ARS Argentina', 'USA United States']} />
  },
  {
    control: <InputText required label="API" id="api" />,
  },
  {
    control: <InputTextArea id="detail" label="Detalle" />,
  }
]

const CurrenciesPage = () => {

  const [data, setData] = useState<any[]>([])

  const navigate = useNavigate()
  const openIncomeForm = (id?) => {
    console.log(id)
    navigate('form/'+(id ?? ''))
  }
  const closeIncomeForm = () => navigate('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3001/api/currency');
      setData(res.data.currencies)
    }
    fetchData().catch(err => console.error(err))
  }, [])
  const columns = [{
    field: 'symbol',
    headerName: 'Símbolo',
    width: 100
  },{
    field: 'name',
    headerName: 'Nombre',
    flex: 1
  },{
    field: 'value',
    headerName: 'Valor',
    type: 'number',
    flex: 1
  },{
    field: 'type',
    headerName: 'Tipo',
    flex: 1
  },{
    field: 'countries',
    headerName: 'Países',
    flex: 1
  },{
    field: 'actions',
    headerName: 'Acciones',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<EditIcon />} onClick={()=>openIncomeForm(params.row.symbol)} label="Edit" />,
      <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
    ]
  }]

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Monedas
      </Typography>
      <Button variant="contained" sx={{ marginY: 2 }} onClick={()=>openIncomeForm()}>
        Cargar moneda
      </Button>
      <Routes>
        <Route path="form">
          <Route path=":id" element={<FormDialog title="Modificar moneda" controls={currencyForm} handleClose={closeIncomeForm} />} />
          <Route path="" element={<FormDialog title="Cargar moneda" controls={currencyForm} handleClose={closeIncomeForm} />} />
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

export default CurrenciesPage