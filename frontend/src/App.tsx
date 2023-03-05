import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Container from "@mui/material/Container";

import React from "react";
import RoutesRoot from "./routes/RoutesRoot";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box className="container vh-100">
            <Navbar />
            <Container fixed style={{ margin: "20px" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<RoutesRoot />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
