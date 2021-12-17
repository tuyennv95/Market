
import React from "react";
import BreadCrumb from "components/Breadcrumb/Breadcrumb";
import Banner from "components/Banner/Banner";
import ShowProducts from "components/ShowProducts/ShowProducts"
import TitleOption from "components/TitleOption/TitleOption"
const Home = () => {
  return (
    <div>
      <Banner />
      <BreadCrumb/>
      <TitleOption />
      <ShowProducts />
    </div>
  );
};

export default Home;
