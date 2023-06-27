import axios from 'axios'
import { Button, Badge, InputLabel, OutlinedInput, Typography, Box } from '@mui/material';
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
import { getNumber, getDateTime, getMoney } from '../utils/formatting';

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
        ? `http://localhost:3080/api/person/${myPersonId}/transactions`
        : `http://localhost:3080/api/transaction`
      const apiSmvm = 'https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=57.1_SMVMM_0_M_34&limit=5000&start=0'
      axios.get(apiUrl).then(res => {
        res.data.transactions.forEach(row => {
            const from = row.from?.account, to = row.to?.account
            //console.log(myEntityId, from?.ownerEntity?._id, to?.ownerEntity?._id)
            if (from?.ownerEntity?._id == to?.ownerEntity?._id) {
                row.color = "info"
                row.transferDirection = "Self-transfer"
            }
            if (myEntityId == from?.ownerEntity?._id) {
                row.color = "error"
                row.transferDirection = "Expense"
                row.fromOwner = true
            }
            if (myEntityId == to?.ownerEntity?._id) {
                row.color = "success"
                row.transferDirection = "Income"
                row.toOwner = true
            }
        })
        setData(res.data.transactions)
      });
      //axios.get(apiSmvm).then(res => setSmvm(res.data.data));
    }
    fetchData()
    .catch(err => console.error(err))
  }, [])

  const columns = [
    {
      field: 'date',
      headerName: 'Fecha',
      valueGetter: (params) => getDateTime(params.row.datetime),
      width: 160,
    // },{
    //   field: 'currency',
    //   headerName: 'Moneda',
    //   renderCell: (params) => (<div>
    //     {params.row.currency}
    //     {(params.row.toCurrency && params.row.currency != params.row.toCurrency) ? <div><small>{params.row.toCurrency}</small></div> : ''}
    //   </div>),
    //   width: 100,
    },{
      field: 'amount',
      headerName: 'Valor',
      valueGetter: (params) => params.row.amount / (params.row.exchangeRate || 1),
      renderCell: (params) => {
        const { currency, color, amount, exchangeRate } = params.row
        return (<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {/*<Box sx={{ mr: 0.5, display: 'inline' }}><small>{params.row.currency}</small></Box>*/}
            <Chip title={currency.name} size="small" label={currency.code} color={color} />
            <Box sx={{ marginLeft: 'auto' }}>{getMoney(amount / (smvm.length ? smvm[smvm.length-1][1] : 1))}</Box>
            {exchangeRate
                ? <div><small>{getMoney(amount / exchangeRate)}</small></div>
                : ''}
        </Box>)
      },
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
    // },{
    //   field: 'detail',
    //   headerName: 'Descripción',
    //   flex: 1
    },{
      field: 'fromAccount',
      headerName: 'Origen',
      valueGetter: (params) => {
        const { from, fromOwner } = params.row
        const account = from?.account
        return fromOwner
            ? (account?.alias
                ?? account?.adminEntity?.person?.lastname
                ?? account?.adminEntity?.name)
            : (account?.alias
                ?? account?.ownerEntity?.person?.lastname
                ?? account?.ownerEntity?.name)
      },
      flex: 1
    },{
      field: 'toAccount',
      headerName: 'Destino',
      valueGetter: (params) => {
        const { to, toOwner } = params.row
        const account = to?.account
        return toOwner
            ? (account?.alias
                ?? account?.adminEntity?.person?.lastname
                ?? account?.adminEntity?.name)
            : (account?.alias
                ?? account?.ownerEntity?.person?.lastname
                ?? account?.ownerEntity?.name)
      },
      flex: 1
    // },{
    //   field: 'type',
    //   headerName: 'Tipo',
    //   renderCell: (params: any) => {
    //     const { transferDirection, color } = params.row
    //     return <Chip label={transferDirection} color={color} />
    //   },
    //   flex: 1
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
          initialState={{pagination: { paginationModel: { pageSize: 8 }}}}
          pageSizeOptions={[5, 10, 25]}
          density="compact"
          autoHeight
        />
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>
  )
}

export default TransactionsPage