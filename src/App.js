import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import React from "react";
import RoutesRoot from "./routes/RoutesRoot";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router className="container vh-100">
      <Navbar /> 
      <Container fixed style={{margin:"20px"}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<RoutesRoot />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
