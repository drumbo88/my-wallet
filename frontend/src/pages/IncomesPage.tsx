import axios from "axios";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import FormDialog from "components/FormDialog";
import MyDatePicker from "components/forms/MyDatePicker";
import SelectCurrency from "components/forms/currency/SelectCurrency";
import MyAutocomplete from "components/forms/MyAutocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InputAmount from "components/forms/InputAmount";
import InputTextArea from "components/forms/InputTextArea";

const incomeForm = [
  {
    control: <MyDatePicker required />,
  },
  {
    style: { width: "14%", marginRight: "1%" },
    control: <SelectCurrency required />,
  },
  {
    style: { width: "85%" },
    control: <InputAmount id="amount" label="Monto" />,
  },
  {
    control: (
      <MyAutocomplete
        required
        id="income"
        label="Concepto"
        options={["Sueldo", "Préstamo", "Bonificación"]}
      />
    ),
  },
  {
    style: { width: "49%", marginRight: "1%" },
    control: (
      <MyAutocomplete id="from" label="Origen" options={["Foncap", "Otro"]} />
    ),
  },
  {
    style: { width: "50%" },
    control: <MyAutocomplete id="to" label="Destino" options={["BBVA C/A"]} />,
  },
  {
    control: <InputTextArea id="detail" label="Detalle" />,
  },
];

const IncomesPage = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const openIncomeForm = (id?) => {
    console.log(id);
    navigate("form/" + (id ?? ""));
  };
  const closeIncomeForm = () => navigate("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3080/api/income");
      setData(res.data.transactions);
    };
    fetchData().catch((err) => console.error(err));
  }, []);
  /*
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    api: { type: String },
    type: { type: String, enum: ['FIAT', 'CRYPTO'], default: 'FIAT', required: true },
    countries: [String],
*/
  const columns =
    /*[
    { text: 'Dessert (100g serving)', prop: 'name' },
    { text: 'Calories', align: 'right', prop: 'calories' },
    { text: 'Fat (g)', align: null, prop: 'fat' },
    { text: 'Carbs (g)', align: 'right', prop: 'carbs' },
    { text: 'Proteins (g)', align: 'right', prop: 'protein' },
  ]*/
    [
      {
        field: "symbol",
        headerName: "Símbolo",
        width: 50,
      },
      {
        field: "name",
        headerName: "Nombre",
        width: 150,
      },
      {
        field: "value",
        headerName: "Valor",
        type: "number",
        flex: 1,
      },
      {
        field: "type",
        headerName: "Tipo",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => openIncomeForm(params.row.symbol)}
            label="Edit"
          />,
          <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            showInMenu
          />,
        ],
      },
    ];

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Ingresos
      </Typography>
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        onClick={() => openIncomeForm()}
      >
        Cargar ingreso
      </Button>
      <Routes>
        <Route path="form">
          <Route
            path=":id"
            element={
              <FormDialog
                title="Modificar ingreso"
                controls={incomeForm}
                handleClose={closeIncomeForm}
              />
            }
          />
          <Route
            path=""
            element={
              <FormDialog
                title="Cargar ingreso"
                controls={incomeForm}
                handleClose={closeIncomeForm}
              />
            }
          />
        </Route>
      </Routes>
      <div style={{ width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
          pageSizeOptions={[8, 15, 25]}
          density="compact"
          autoHeight
        />
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>
  );
};

export default IncomesPage;
