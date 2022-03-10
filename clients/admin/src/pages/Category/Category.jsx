import React, { useEffect } from "react";

import EditTable from "components/table/EditTableUser";
import { Spin, Button } from "antd";
import EditTableUser from "components/table/EditTableUser";
import { getAllCustomer } from "redux/actions/AsyncCustomer";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import EditTableCategory from "components/table/EditTableCategory";
import { getAllCategory } from "redux/actions/AsyncCategory";
const Customers = (props) => {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const data = useSelector((state) => state.CategoryReducer.listCategory);
  const history = useHistory();
  const dispatch = useDispatch();
const keySearch =  queryString.parse(props.location.search);
useEffect(() => {
  dispatch(
    getAllCategory({
      recordPerPage: 1000,
    })
  );
}, [dispatch]);
  useEffect(() => {
    dispatch(
      getAllCustomer({
        recordPerPage: 1000,
        keyword: keySearch.key || '',
      })
    );
  }, [dispatch, keySearch.key]);
  const movePage = ()=>{
        history.push('/categories/create-category')
  }
  return (
    <div>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <h2 className="page-header">customers {isLoading ? <Spin /> : null}</h2>
        <Button onClick={movePage} type="primary">+ Add Category</Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <EditTableCategory data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
