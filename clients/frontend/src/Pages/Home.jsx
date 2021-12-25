import React, { useEffect, useState } from "react";
import BreadCrumb from "components/Breadcrumb/Breadcrumb";
import Banner from "components/Banner/Banner";
import ShowProducts from "components/ShowProducts/ShowProducts";
import TitleOption from "components/TitleOption/TitleOption";
import { getProducts } from "store/productsSlice";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState()
  useEffect(() => {
    async function getData() {
      const dataProducts = await dispatch(
        getProducts({
          // currentPage: 1,
          recordPerPage: 100,
        })
      );
    setListData(dataProducts.payload.data)

    }

    getData();
  }, [dispatch]);
  return (
    <div>
      <Banner />
      <BreadCrumb />
      <TitleOption />
      <ShowProducts data={listData}/>
    </div>
  );
};

export default Home;
