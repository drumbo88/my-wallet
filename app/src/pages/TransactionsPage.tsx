import axios from 'axios'
import { Button, Badge, InputLabel, OutlinedInput, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem, GridRowModel } from '@mui/x-data-grid';
import Chip from '../components/MyChip';
import FormDialog from '../components/FormDialog';
import MyDatePicker from '../components/MyDatePicker';
import MyCurrencySelect from '../components/MyCurrencySelect';
import MyAutocomplete from '../components/MyAutocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { getNumber, getDateTime } from '../utils/formatting';

const transactionForm = [
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
        id="transaction" label="Concepto" options={['Sueldo', 'Préstamo', 'Bonificación']} />
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

const TransactionsPage = () => {

  const [data, setData] = useState([])
  const [smvm, setSmvm] = useState([])

  const navigate = useNavigate()
  const openTransactionForm = (id?) => {
    navigate('form/'+(id ?? ''))
  }
  const closeTransactionForm = () => navigate('')

  const qParams = useParams()
  const myPersonId = qParams.id
  const myEntityId = qParams.id

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = qParams.id
        ? `http://localhost:3001/api/person/${myPersonId}/transactions`
        : `http://localhost:3001/api/transaction`
      const apiSmvm = 'https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=57.1_SMVMM_0_M_34&limit=5000&start=0'
      axios.get(apiUrl).then(res => setData(res.data.transactions));
      axios.get(apiSmvm).then(res => setSmvm(res.data.data));
    }
    fetchData()
    .catch(err => console.error(err))
  }, [])

  const columns = [
    {
      field: 'date',
      headerName: 'Fecha',
      valueGetter: (params) => getDateTime(params.row.date),
      width: 150,
    },{
      field: 'currency',
      headerName: 'Moneda',
      renderCell: (params) => (<div>
        {params.row.currency}
        {params.row.toCurrency ? <div><small>{params.row.toCurrency}</small></div> : ''}
      </div>),
      width: 100,
    },{
      field: 'amount',
      headerName: 'Valor',
      valueGetter: (params) => params.row.amount / (params.row.exchangeRate || 1),
      renderCell: (params) => (<div>
        {getNumber(params.row.amount / (smvm.length ? smvm[smvm.length-1][1] : 1))}
        {params.row.exchangeRate ? <div><small>{getNumber(params.row.amount / params.row.exchangeRate)}</small></div> : ''}
      </div>),
      type: 'number',
      flex: 1
    },{
      /*field: 'amountCant',
      headerName: 'CANT',
      // valueGetter: (params) => params.row.amount / (params.row.exchangeRate || 1),
      renderCell: (params) => (<div>
        {Math.round((smvm.length ? smvm[smvm.length-1][1] : 1) / params.row.amount* 100) / 100}
      </div>),
      type: 'number',
      flex: 1
    },{*/
      field: 'conceptName',
      headerName: 'Concepto',
      valueGetter: (params) => params.row.allocations[0]?.operation.detail || 'Sin definir',
      flex: 1
    },{
      field: 'detail',
      headerName: 'Descripción',
      flex: 1
    },{
      field: 'fromAccount',
      headerName: 'Origen',
      valueGetter: (params) => params.row.from?.alias ?? params.row.from.account.alias,
      flex: 1
    },{
      field: 'toAccount',
      headerName: 'Destino',
      valueGetter: (params) => params.row.toAccount?.alias ?? '',
      flex: 1
    },{
      field: 'type',
      headerName: 'Tipo',
      renderCell: (params: any) => {
        const from = params.row.from?.account, to = params.row.to?.account
        if (from?.ownerEntity?._id == to?.ownerEntity?._id)
          return <Chip label="Self-transfer" color="info" />
        if (myEntityId == from?.ownerEntity?._id)
          return <Chip label="Expense" color="error" />
        if (myEntityId == to?.ownerEntity?._id)
          return <Chip label="Income" color="success" variant="outlined" />
      },
      flex: 1
    },{
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={()=>openTransactionForm(params.row.symbol)} label="Edit" />,
        <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
      ]
    }
  ]

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Transacciones
      </Typography>
      <Button variant="contained" sx={{ marginY: 2 }} onClick={()=>openTransactionForm()}>
        Cargar transacción
      </Button>
      <Routes>
        <Route path="form">
          <Route path=":id" element={<FormDialog title="Modificar transacción" controls={transactionForm} handleClose={closeTransactionForm} />} />
          <Route path="" element={<FormDialog title="Cargar transacción" controls={transactionForm} handleClose={closeTransactionForm} />} />
        </Route>
      </Routes>
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(row: GridRowModel)=>row._id}
          rows={data}
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

export default TransactionsPage