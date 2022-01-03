import React from "react";
import HeaderTop from "./components/Header/HeaderTop";
import HeaderMid from "./components/Header/HeaderMid";
import Menu from "./components/Menu/Menu";
// import axios from "axios";
// import { Button } from "antd";
import Footer from "components/Footer/Footer";
import Router from "Router/Router";
function App() {
  
  return (
    <>
      <HeaderTop />
      {/* <hr /> */}
      <HeaderMid />
      {/* <Button onClick={hihi}>dddddddd</Button>/ */}
      <Menu />
      <Router />
      <Footer />
    </>
  );
}

export default App;
