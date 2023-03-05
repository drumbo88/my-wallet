import axios from "axios";
import { Button, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import FormDialog from "../components/FormDialog";
import MyDatePicker from "../components/MyDatePicker";
import MyCurrencySelect from "../components/MyCurrencySelect";
import MyAutocomplete from "../components/MyAutocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const incomeForm = [
  {
    control: <MyDatePicker />,
  },
  {
    style: { width: "14%", marginRight: "1%" },
    control: <MyCurrencySelect />,
  },
  {
    style: { width: "85%" },
    control: (
      <>
        <InputLabel htmlFor="amount">Monto</InputLabel>
        <OutlinedInput
          //startAdornment={<InputAdornment position="start">$</InputAdornment>}
          fullWidth
          id="amount"
          label="Monto"
        />
      </>
    ),
  },
  {
    control: (
      <MyAutocomplete
        variant="outlined"
        id="income"
        label="Concepto"
        options={["Sueldo", "Préstamo", "Bonificación"]}
      />
    ),
  },
  {
    style: { width: "49%", marginRight: "1%" },
    control: (
      <MyAutocomplete
        variant="outlined"
        id="from"
        label="Origen"
        options={["Foncap", "Otro"]}
      />
    ),
  },
  {
    style: { width: "50%" },
    control: (
      <MyAutocomplete
        variant="outlined"
        id="to"
        label="Destino"
        options={["BBVA C/A"]}
      />
    ),
  },
  {
    control: (
      <>
        <InputLabel htmlFor="detail">Detalle</InputLabel>
        <OutlinedInput fullWidth id="detail" label="Detalle" />
      </>
    ),
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
      const res = await axios.get("http://localhost:3001/api/income");
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
          pageSize={8}
          rowsPerPageOptions={[8]}
          density="compact"
          autoHeight
        />
      </div>
      {/*<DenseTable rows={rows} columns={columns} />*/}
    </div>
  );
};

export default IncomesPage;
