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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const x_data_grid_1 = require("@mui/x-data-grid");
const MyChip_1 = __importDefault(require("../components/MyChip"));
const FormDialog_1 = __importDefault(require("../components/FormDialog"));
const MyDatePicker_1 = __importDefault(require("../components/MyDatePicker"));
const MyCurrencySelect_1 = __importDefault(require("../components/MyCurrencySelect"));
const MyAutocomplete_1 = __importDefault(require("../components/MyAutocomplete"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const FileCopy_1 = __importDefault(require("@mui/icons-material/FileCopy"));
const formatting_1 = require("../utils/formatting");
const transactionForm = [
    {
        control: <MyDatePicker_1.default />
    },
    {
        style: { width: '14%', marginRight: '1%' },
        control: <MyCurrencySelect_1.default />
    },
    {
        style: { width: '85%' },
        control: <>
      <material_1.InputLabel htmlFor="amount">Monto</material_1.InputLabel>
      <material_1.OutlinedInput 
        //startAdornment={<InputAdornment position="start">$</InputAdornment>}
        fullWidth id="amount" label="Monto"/>
    </>
    },
    {
        control: <MyAutocomplete_1.default variant="outlined" id="transaction" label="Concepto" options={['Sueldo', 'Préstamo', 'Bonificación']}/>
    },
    {
        style: { width: '49%', marginRight: '1%' },
        control: <MyAutocomplete_1.default variant="outlined" id="from" label="Origen" options={['Foncap', 'Otro']}/>
    },
    {
        style: { width: '50%' },
        control: <MyAutocomplete_1.default variant="outlined" id="to" label="Destino" options={['BBVA C/A']}/>
    },
    {
        control: <>
      <material_1.InputLabel htmlFor="detail">Detalle</material_1.InputLabel>
      <material_1.OutlinedInput fullWidth id="detail" label="Detalle"/>
    </>,
    }
];
const TransactionsPage = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const [smvm, setSmvm] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const openTransactionForm = (id) => {
        navigate('form/' + (id !== null && id !== void 0 ? id : ''));
    };
    const closeTransactionForm = () => navigate('');
    const qParams = (0, react_router_dom_1.useParams)();
    const myPersonId = qParams.id;
    const myEntityId = qParams.id;
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            const apiUrl = qParams.id
                ? `http://localhost:3080/api/person/${myPersonId}/transactions`
                : `http://localhost:3080/api/transaction`;
            const apiSmvm = 'https://apis.datos.gob.ar/series/api/series/?metadata=full&ids=57.1_SMVMM_0_M_34&limit=5000&start=0';
            axios_1.default.get(apiUrl).then(res => {
                res.data.transactions.forEach(row => {
                    var _a, _b, _c, _d, _e, _f;
                    const from = (_a = row.from) === null || _a === void 0 ? void 0 : _a.account, to = (_b = row.to) === null || _b === void 0 ? void 0 : _b.account;
                    //console.log(myEntityId, from?.ownerEntity?._id, to?.ownerEntity?._id)
                    if (((_c = from === null || from === void 0 ? void 0 : from.ownerEntity) === null || _c === void 0 ? void 0 : _c._id) == ((_d = to === null || to === void 0 ? void 0 : to.ownerEntity) === null || _d === void 0 ? void 0 : _d._id)) {
                        row.color = "info";
                        row.transferDirection = "Self-transfer";
                    }
                    if (myEntityId == ((_e = from === null || from === void 0 ? void 0 : from.ownerEntity) === null || _e === void 0 ? void 0 : _e._id)) {
                        row.color = "error";
                        row.transferDirection = "Expense";
                        row.fromOwner = true;
                    }
                    if (myEntityId == ((_f = to === null || to === void 0 ? void 0 : to.ownerEntity) === null || _f === void 0 ? void 0 : _f._id)) {
                        row.color = "success";
                        row.transferDirection = "Income";
                        row.toOwner = true;
                    }
                });
                setData(res.data.transactions);
            });
            //axios.get(apiSmvm).then(res => setSmvm(res.data.data));
        });
        fetchData()
            .catch(err => console.error(err));
    }, []);
    const columns = [
        {
            field: 'date',
            headerName: 'Fecha',
            valueGetter: (params) => (0, formatting_1.getDateTime)(params.row.datetime),
            width: 160,
            // },{
            //   field: 'currency',
            //   headerName: 'Moneda',
            //   renderCell: (params) => (<div>
            //     {params.row.currency}
            //     {(params.row.toCurrency && params.row.currency != params.row.toCurrency) ? <div><small>{params.row.toCurrency}</small></div> : ''}
            //   </div>),
            //   width: 100,
        }, {
            field: 'amount',
            headerName: 'Valor',
            valueGetter: (params) => params.row.amount / (params.row.exchangeRate || 1),
            renderCell: (params) => {
                const { currency, color, amount, exchangeRate } = params.row;
                return (<material_1.Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {/*<Box sx={{ mr: 0.5, display: 'inline' }}><small>{params.row.currency}</small></Box>*/}
            <MyChip_1.default title={currency.name} size="small" label={currency.code} color={color}/>
            <material_1.Box sx={{ marginLeft: 'auto' }}>{(0, formatting_1.getMoney)(amount / (smvm.length ? smvm[smvm.length - 1][1] : 1))}</material_1.Box>
            {exchangeRate
                        ? <div><small>{(0, formatting_1.getMoney)(amount / exchangeRate)}</small></div>
                        : ''}
        </material_1.Box>);
            },
            type: 'number',
            flex: 1
        }, {
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
            valueGetter: (params) => { var _a; return ((_a = params.row.allocations[0]) === null || _a === void 0 ? void 0 : _a.operation.detail) || 'Sin definir'; },
            flex: 1
            // },{
            //   field: 'detail',
            //   headerName: 'Descripción',
            //   flex: 1
        }, {
            field: 'fromAccount',
            headerName: 'Origen',
            valueGetter: (params) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                const { from, fromOwner } = params.row;
                const account = from === null || from === void 0 ? void 0 : from.account;
                return fromOwner
                    ? ((_d = (_a = account === null || account === void 0 ? void 0 : account.alias) !== null && _a !== void 0 ? _a : (_c = (_b = account === null || account === void 0 ? void 0 : account.adminEntity) === null || _b === void 0 ? void 0 : _b.person) === null || _c === void 0 ? void 0 : _c.lastname) !== null && _d !== void 0 ? _d : (_e = account === null || account === void 0 ? void 0 : account.adminEntity) === null || _e === void 0 ? void 0 : _e.name)
                    : ((_j = (_f = account === null || account === void 0 ? void 0 : account.alias) !== null && _f !== void 0 ? _f : (_h = (_g = account === null || account === void 0 ? void 0 : account.ownerEntity) === null || _g === void 0 ? void 0 : _g.person) === null || _h === void 0 ? void 0 : _h.lastname) !== null && _j !== void 0 ? _j : (_k = account === null || account === void 0 ? void 0 : account.ownerEntity) === null || _k === void 0 ? void 0 : _k.name);
            },
            flex: 1
        }, {
            field: 'toAccount',
            headerName: 'Destino',
            valueGetter: (params) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                const { to, toOwner } = params.row;
                const account = to === null || to === void 0 ? void 0 : to.account;
                return toOwner
                    ? ((_d = (_a = account === null || account === void 0 ? void 0 : account.alias) !== null && _a !== void 0 ? _a : (_c = (_b = account === null || account === void 0 ? void 0 : account.adminEntity) === null || _b === void 0 ? void 0 : _b.person) === null || _c === void 0 ? void 0 : _c.lastname) !== null && _d !== void 0 ? _d : (_e = account === null || account === void 0 ? void 0 : account.adminEntity) === null || _e === void 0 ? void 0 : _e.name)
                    : ((_j = (_f = account === null || account === void 0 ? void 0 : account.alias) !== null && _f !== void 0 ? _f : (_h = (_g = account === null || account === void 0 ? void 0 : account.ownerEntity) === null || _g === void 0 ? void 0 : _g.person) === null || _h === void 0 ? void 0 : _h.lastname) !== null && _j !== void 0 ? _j : (_k = account === null || account === void 0 ? void 0 : account.ownerEntity) === null || _k === void 0 ? void 0 : _k.name);
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
        }, {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
                <x_data_grid_1.GridActionsCellItem icon={<Edit_1.default />} onClick={() => openTransactionForm(params.row.symbol)} label="Edit"/>,
                <x_data_grid_1.GridActionsCellItem icon={<FileCopy_1.default />} label="Print"/>,
                <x_data_grid_1.GridActionsCellItem icon={<Delete_1.default />} label="Delete" showInMenu/>,
            ]
        }
    ];
    return (<div>
      <material_1.Typography variant="h4" marginBottom={1}>
        Transacciones
      </material_1.Typography>
      <material_1.Button variant="contained" sx={{ marginY: 2 }} onClick={() => openTransactionForm()}>
        Cargar transacción
      </material_1.Button>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="form">
          <react_router_dom_1.Route path=":id" element={<FormDialog_1.default title="Modificar transacción" controls={transactionForm} handleClose={closeTransactionForm}/>}/>
          <react_router_dom_1.Route path="" element={<FormDialog_1.default title="Cargar transacción" controls={transactionForm} handleClose={closeTransactionForm}/>}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
      <div style={{ width: '100%' }}>
        <x_data_grid_1.DataGrid getRowId={(row) => row._id} rows={data} columns={columns} pageSize={8} rowsPerPageOptions={[8]} density="compact" autoHeight/>
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>);
};
exports.default = TransactionsPage;
