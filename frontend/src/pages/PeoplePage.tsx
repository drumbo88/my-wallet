import axios from "axios";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridActionsCellItem, GridRowModel } from "@mui/x-data-grid";
import Chip from "components/MyChip";
import FormDialog from "components/FormDialog";
import MyAutocomplete from "components/forms/MyAutocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InputText from "components/forms/InputText";
import InputTextArea from "components/forms/InputTextArea";
import MyDatePicker from "components/forms/MyDatePicker";
import SelectGender from "components/forms/gender/SelectGender";

const personForm = [
  {
    style: { width: "32.66%", marginRight: "1%" },
    control: <InputText required label="Nombre/s" id="nombres" />,
  },
  {
    style: { width: "32.66%", marginRight: "1%" },
    control: <InputText required label="Apellido/s" id="apellidos" />,
  },
  {
    style: { width: "32.66%" },
    control: <InputText label="Apodo" id="apodo" />,
  },
  {
    style: { width: "32.66%", marginRight: "1%" },
    control: <InputText label="CUIL" id="cuil" />,
  },
  {
    style: { width: "32.66%", marginRight: "1%" },
    control: <SelectGender required label="Género" id="genero" />,
  },
  {
    style: { width: "32.66%" },
    control: <MyDatePicker required label="Fecha de nacimiento" />,
  },
  {
    control: <InputText label="Domicilio" id="address" />,
  },
  {
    control: <InputTextArea id="detail" label="Detalle" />,
  },
];

const PeoplePage = () => {
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
      })
      .catch(e => {
        console.error(e)
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
                title="Modificar persona"
                controls={personForm}
                handleClose={closePersonForm}
              />
            }
          />
          <Route
            path=""
            element={
              <FormDialog
                title="Cargar persona"
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

export default PeoplePage;
