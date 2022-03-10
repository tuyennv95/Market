import React from "react";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

const PaginationPage = () => {
  const navigate = useNavigate();
  const loca = useLocation();
  const pathname = loca.pathname;
  const search = queryString.parse(loca.search);
  const page = parseInt(search.page) || 1;
const count = useSelector(state => state.count.count);


  function makeUrl(page) {
    return `${pathname}?${queryString.stringify({ ...search, page: page })}`;
  }

  const setPage = (x) => {
    navigate(makeUrl(x));
  };
  return (
    <div style={{paddingBottom:'50px'}}>
      <Pagination onChange={setPage} total={count} pageSize={10}/>
    </div>
  );
};

export default PaginationPage;
