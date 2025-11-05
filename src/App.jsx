import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Design from "./pages/design";
import Organization from "./pages/organization";
import Contact from "./pages/contact";
import OrderForm from "./pages/orderForm";
import Success from "./pages/success";
import Layout from "./layout/Layout";
import DesainCustom from "./pages/desainCustom";
import Pending from "./pages/pending";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<Design />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pending" element={<Pending />} />
         <Route path="/desain-custom" element={<DesainCustom />} />
      </Route>
    </Routes>
  );
};

export default App;
