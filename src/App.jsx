import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import Design from "./pages/Design";
import Organization from "./pages/organization";
import Demo from "./pages/demo";
import Contact from "./pages/contact";
import OrderForm from "./pages/orderForm";
import Success from "./pages/success";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
};

export default App;
