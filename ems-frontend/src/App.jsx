import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployee from "./components/ListEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import EmployeeComp from "./components/EmployeeComp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComp />
        <Routes>
          {/* {// http://localhost:3000} */}
          <Route path="/" element={<ListEmployee />}></Route>
          {/* // http://localhost:3000/getAllEmployees */}
          <Route path="/getAllEmployees" element={<ListEmployee />}></Route>
          <Route path="/add-employee" element={<EmployeeComp />}></Route>
          <Route path="/update-employee/:id" element={<EmployeeComp />}></Route>
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
}

export default App;
