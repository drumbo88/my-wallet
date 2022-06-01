import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from "react";
import RoutesRoot from "./routes/RoutesRoot";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router className="container vh-100">
      <Navbar /> 
      <div className="container" style={{margin:"20px"}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<RoutesRoot />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
