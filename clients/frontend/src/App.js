import React, { useEffect } from "react";
import HeaderTop from "./components/Header/HeaderTop";
import HeaderMid from "./components/Header/HeaderMid";
import Menu from "./components/Menu/Menu";
// import axios from "

// import { Button } from "antd";
import Footer from "components/Footer/Footer";
import Router from "Router/Router";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  

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
