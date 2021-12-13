import HeaderTop from "./components/Header/HeaderTop";
import HeaderMid from "./components/Header/HeaderMid";
import Menu from "./components/Menu/Menu";
import Banner from "./components/Banner/Banner";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import TitleOption from "components/TitleOption/TitleOption";
import ShowProducts from "components/ShowProducts/ShowProducts";
import Footer from "components/Footer/Footer";
import Home from "Pages/Home";
import Router from "Router/Router";
function App() {
  return (
    <>
      <HeaderTop />
      <hr />
      <HeaderMid />
      <Menu />
      <Router />
      <Footer />
    </>
  );
}

export default App;
