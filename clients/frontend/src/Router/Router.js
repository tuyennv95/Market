import React from "react";
import { Routes, Route , } from "react-router-dom";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Product from "Pages/Product";
import Cart from "Pages/Cart";
import LoginPage from "Pages/LoginPage";
import RegisterPage from "Pages/RegisterPage";
import PrivateRouter from "./PrivateRouter";
import Search from "Pages/Search";
import Category from "Pages/Category";
import HistoryBuy from "Pages/HistoryBuy";
const Router = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="search" element={<Search />} />
      <Route path="category/:id" element={<Category />} />
      <Route path="product/:id" element={<Product />} />
      <Route
        path="cart"
        element={
          <PrivateRouter >
            <Cart />
          </PrivateRouter>
        }
      />
      <Route
        path="history"
        element={
          <PrivateRouter >
            <HistoryBuy />
          </PrivateRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
