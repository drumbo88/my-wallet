import axios from "axios";
import {
  Button,
  Badge,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import Chip from "../components/MyChip";
import FormDialog from "../components/FormDialog";
import MyDatePicker from "../components/MyDatePicker";
import MyCurrencySelect from "../components/MyCurrencySelect";
import MyAutocomplete from "../components/MyAutocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { getNumber, getDateTime, getMoney } from "../utils/formatting";

import OperationTypes from 'common/types/operation'

const personForm = [
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
        id="transaction"
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

const PeoplePage = () => {

    console.log(OperationTypes)
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const openPersonForm = (id?) => {
    navigate("form/" + (id ?? ""));
  };
  const closePersonForm = () => navigate("");

  const qParams = useParams();
  const myPersonId = qParams.id;
  const myEntityId = qParams.id;

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `http://localhost:3080/api/person`;
      axios.get(apiUrl).then((res) => {
        console.log(res.data.people);
        res.data.people.forEach((row) => {});
        setData(res.data.people);
      });
      //axios.get(apiSmvm).then(res => setSmvm(res.data.data));
    };
    fetchData().catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      field: "firstName",
      headerName: "Nombre completo",
      valueGetter: (params) => {
        const { person } = params.row;
        return `${person.firstname} ${person.lastname}`;
      },
      flex: 1,
    },
    {
      field: "taxId",
      headerName: "ID de impuestos",
      flex: 1,
    },
    {
        field: "user",
        headerName: "Usuario",
        valueGetter: (params) => {
          const { user } = params.row;
          return user.name || user.email;
        },
        flex: 1,
      },
      {
      field: "currency",
      headerName: "Moneda",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estado",
      renderCell: (params) => {
        const { status } = params.row;
        let label, color;
        switch (status) {
          case "ACTIVE":
            label = "Activo";
            color = "success";
            break;
          case "INACTIVE":
            label = "Inactivo";
            color = "error";
            break;
        }
        return <Chip size="small" label={label} color={color} />;
      },
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => openPersonForm(params.row.symbol)}
          label="Edit"
        />,
        <GridActionsCellItem icon={<FileCopyIcon />} label="Print" />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
      ],
    },
  ];

  return (
    <div>
      <Typography variant="h4" marginBottom={1}>
        Personas
      </Typography>
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        onClick={() => openPersonForm()}
      >
        Cargar persona
      </Button>
      <Routes>
        <Route path="form">
          <Route
            path=":id"
            element={
              <FormDialog
                title="Modificar transacción"
                controls={personForm}
                handleClose={closePersonForm}
              />
            }
          />
          <Route
            path=""
            element={
              <FormDialog
                title="Cargar transacción"
                controls={personForm}
                handleClose={closePersonForm}
              />
            }
          />
        </Route>
      </Routes>
      <div style={{ width: "100%" }}>
        <DataGrid
          getRowId={(row: GridRowModel) => row._id}
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

export default PeoplePage;
