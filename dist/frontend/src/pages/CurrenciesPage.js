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
const FormDialog_1 = __importDefault(require("../components/FormDialog"));
const MyAutocomplete_1 = __importDefault(require("../components/MyAutocomplete"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const FileCopy_1 = __importDefault(require("@mui/icons-material/FileCopy"));
const currencyForm = [
    {
        style: { width: '19%', marginRight: '1%' },
        control: <>
      <material_1.InputLabel htmlFor="symbol">Símbolo</material_1.InputLabel>
      <material_1.OutlinedInput fullWidth id="symbol" label="Símbolo"/>
    </>,
    },
    {
        style: { width: '80%' },
        control: <>
      <material_1.InputLabel htmlFor="nombre">Nombre</material_1.InputLabel>
      <material_1.OutlinedInput fullWidth id="nombre" label="Nombre"/>
    </>
    },
    {
        style: { width: '49%', marginRight: '1%' },
        control: <MyAutocomplete_1.default variant="outlined" id="from" label="Tipo" options={['FIAT', 'CRYPTO']}/>
    },
    {
        style: { width: '50%' },
        control: <MyAutocomplete_1.default variant="outlined" id="to" label="País" options={['ARS Argentina', 'USA United States']}/>
    },
    {
        control: <>
      <material_1.InputLabel htmlFor="api">API</material_1.InputLabel>
      <material_1.OutlinedInput fullWidth id="api" label="API"/>
    </>,
    },
    {
        control: <>
      <material_1.InputLabel htmlFor="detail">Detalle</material_1.InputLabel>
      <material_1.OutlinedInput fullWidth id="detail" label="Detalle"/>
    </>,
    }
];
const CurrenciesPage = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const openIncomeForm = (id) => {
        console.log(id);
        navigate('form/' + (id !== null && id !== void 0 ? id : ''));
    };
    const closeIncomeForm = () => navigate('');
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield axios_1.default.get('http://localhost:3080/api/currency');
            setData(res.data.currencies);
        });
        fetchData().catch(err => console.error(err));
    }, []);
    const columns = [{
            field: 'symbol',
            headerName: 'Símbolo',
            width: 100
        }, {
            field: 'name',
            headerName: 'Nombre',
            flex: 1
        }, {
            field: 'value',
            headerName: 'Valor',
            type: 'number',
            flex: 1
        }, {
            field: 'type',
            headerName: 'Tipo',
            flex: 1
        }, {
            field: 'countries',
            headerName: 'Países',
            flex: 1
        }, {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            getActions: (params) => [
                <x_data_grid_1.GridActionsCellItem icon={<Edit_1.default />} onClick={() => openIncomeForm(params.row.symbol)} label="Edit"/>,
                <x_data_grid_1.GridActionsCellItem icon={<FileCopy_1.default />} label="Print"/>,
                <x_data_grid_1.GridActionsCellItem icon={<Delete_1.default />} label="Delete" showInMenu/>,
            ]
        }];
    return (<div>
      <material_1.Typography variant="h4" marginBottom={1}>
        Monedas
      </material_1.Typography>
      <material_1.Button variant="contained" sx={{ marginY: 2 }} onClick={() => openIncomeForm()}>
        Cargar moneda
      </material_1.Button>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="form">
          <react_router_dom_1.Route path=":id" element={<FormDialog_1.default title="Modificar moneda" controls={currencyForm} handleClose={closeIncomeForm}/>}/>
          <react_router_dom_1.Route path="" element={<FormDialog_1.default title="Cargar moneda" controls={currencyForm} handleClose={closeIncomeForm}/>}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
      <div style={{ width: '100%' }}>
        <x_data_grid_1.DataGrid getRowId={row => row._id} rows={data} columns={columns} pageSize={8} rowsPerPageOptions={[8]} density="compact" autoHeight/>
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>);
};
exports.default = CurrenciesPage;
