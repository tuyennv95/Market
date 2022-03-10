import React,{useState, useEffect} from "react";
import { Row, Col, Button } from "antd";
import ProductDetail from "components/ProductDetail/ProductDetail";
import "./style.css";
import queryString from 'query-string';
import { getProducts, getTop} from "store/productsSlice";
import { useParams } from 'react-router';

import TitleOption from "components/TitleOption/TitleOption";
import Pagination from "components/PaginationPage/PaginationPage";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';

const ShowProducts = (props) => {
const dispatch = useDispatch();
let {id} = useParams();
let listDataUp = [...props.data];
let listDataDown = [...props.data];
const location = useLocation();
const search =  queryString.parse(location?.search);
const { page,isSale, fieldSorted, sort, key} = search;
console.log('🚀 ~ sort', sort);
listDataUp.sort(function(a, b) {
  let firts = a.sale && a.price.priceSale ? a.price.priceSale : a.price.price;
      let last = b.sale && b.price.priceSale ? b.price.priceSale : b.price.price;
  return parseFloat(firts) - parseFloat(last);
});
listDataDown.sort(function(a, b) {
  let firts = a.sale && a.price.priceSale ? a.price.priceSale : a.price.price;
      let last = b.sale && b.price.priceSale ? b.price.priceSale : b.price.price;
  return parseFloat(last) - parseFloat(firts);
});
const datafilter = !sort ? props.data : sort === 'ASC' ? listDataUp : listDataDown;

useEffect(() => {
    dispatch(getProducts({
       categoryCode: id,
        isSale: isSale,
        currentPage: page,
        recordPerPage: 10,
        fieldSorted : fieldSorted,
        typeSorted: sort,
        keyword: key,

      }));
}, [dispatch, page,isSale,sort,key,id]);
useEffect(() => {
    dispatch(getTop());
}, [dispatch]);

  
useEffect(() => {
  window.scrollTo(0, 0);
}, [])
  return (
    <div className="show-products">
      <div className="container">
      <TitleOption />
        <div className="show-products-main">
          <Row
            justify="space-between"
            style={{ flexWrap: "wrap", marginBottom:'200px' }}
            gutter={[8, 16]}
            align="middle"
          >
            {props &&
             datafilter.map((propduct, index) => (
                <Col className="styleCol" key={propduct.code} md={6} sm={8} xs={12}>
                  <ProductDetail  data={propduct}/>
                </Col>
              ))}
          </Row>

          <Pagination count={props?.count}/>
        </div>
      </div>
    </div>
  );
};
export default ShowProducts;
