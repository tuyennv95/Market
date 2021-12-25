import React from "react";
import { Routes, Route , } from "react-router-dom";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Product from "Pages/Product";
import Cart from "Pages/Cart";
import LoginPage from "Pages/LoginPage";
import RegisterPage from "Pages/RegisterPage";
import PrivateRouter from "./PrivateRouter";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="product/:id" element={<Product />} />
      <Route
        path="cart"
        element={
          <PrivateRouter >
            <Cart />
          </PrivateRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
