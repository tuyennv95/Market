import React, { useEffect } from "react";

import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";

import { BrowserRouter, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../redux/actions/ThemeAction";
import Router from "Router/Router";
import Login from "components/Login/Login";
const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  // const token = localStorage.getItem("token");
  const {token} = useSelector((state) => state.AuthReducer);
  return (
    <>
      <BrowserRouter>
        {token ? (
          <Route
            render={(props) => (
              <div
                className={`layout ${themeReducer.mode} ${themeReducer.color}`}
              >
                <Sidebar {...props} />
                <div className="layout__content">
                  <TopNav />
                  <div className="layout__content-main">
                    <Router />
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
