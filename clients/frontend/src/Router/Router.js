import React from "react";
import { Routes, Route } from "react-router-dom";
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
import ChangePassword from "Pages/ChangePassword";
import OrderDetail from "components/HistoryOrder/OrderDetail";
import Template from "components/Template/Template";
import OrderSuccess from "components/OrderSuccess/OrderSuccess";
import LoveProduct from "Pages/LoveProduct";
import PublicRouter from "./PublicRouter";
import DoiTra from "Pages/DoiTra";
const Router = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="search" element={<Search />} />
      <Route path="category/:id" element={<Category />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="chinh-sach-van-chuyen-doi-tra-2021" element={<DoiTra />} />
      <Route
        path="login"
        element={
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        }
      />
      <Route
        path="register"
        element={
          <PublicRouter>
            <RegisterPage />
          </PublicRouter>
        }
      />

      <Route
        path="cart"
        element={
          <PrivateRouter>
            <Cart />
          </PrivateRouter>
        }
      />
      <Route
        path="change-password"
        element={
          <PrivateRouter>
            <ChangePassword />
          </PrivateRouter>
        }
      />
      <Route
        path="history"
        element={
          <PrivateRouter>
            <HistoryBuy />
          </PrivateRouter>
        }
      />
      <Route
        path="order/:id"
        element={
          <PrivateRouter>
            <OrderDetail />
          </PrivateRouter>
        }
      />
      <Route
        path="order-success/:id"
        element={
          <PrivateRouter>
            <OrderSuccess />
          </PrivateRouter>
        }
      />
      <Route
        path="love"
        element={
          <PrivateRouter>
            <LoveProduct />
          </PrivateRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
