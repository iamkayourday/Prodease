import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';
import SalesTable from './components/SalesTable';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Navbar />
        <header className="w-full bg-blue-600 text-white py-4 shadow">
          <h1 className="text-2xl text-center font-bold">
            Product Manager App
          </h1>
        </header>
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/sales" element={<SalesTable />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;

