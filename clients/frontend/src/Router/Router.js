import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import LoginReg from "Pages/LoginReg";
const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginReg />} />
        <Route path="register" element={<LoginReg />} />
        <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
  );
};

export default Router;
