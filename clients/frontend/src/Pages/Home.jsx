import React, { useEffect, useState } from "react";
import Banner from "components/Banner/Banner";
import ShowProducts from "components/ShowProducts/ShowProducts";
import {getCount } from 'store/productCountSlice'
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';

const Home = () => {
  const dispatch = useDispatch();
  const listData = useSelector(state => state.products.listProducts);
  const count = useSelector(state => state.count.count);
  const location = useLocation();
  const search =  queryString.parse(location?.search);
  const {isSale} = search;
  const [stateList, setStateList] = useState();
  // const listLove = useSelector((state) => state?.user?.listLove);

  useEffect(() => {
    dispatch(getCount({ 
      isSale: isSale,
      recordPerPage: 1000,
    }))
  },[dispatch,isSale])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 
  return (
    <div>
      <Banner />
     
      <ShowProducts data={listData}/>
    </div>
  );
};

export default Home;
