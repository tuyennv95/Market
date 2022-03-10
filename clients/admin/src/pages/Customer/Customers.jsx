import React, { useEffect } from "react";

import EditTable from "components/table/EditTableUser";
import { Spin, Button } from "antd";
import EditTableUser from "components/table/EditTableUser";
import { getAllCustomer } from "redux/actions/AsyncCustomer";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import { CANCEL_REDIRECT } from "constan/types";
const Customers = (props) => {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const data = useSelector((state) => state.CustomerReducer.listUsers);
  const history = useHistory();
  const dispatch = useDispatch();
const keySearch =  queryString.parse(props.location.search);
const res = useSelector((state) => state.LoadingReducer.redirect);

  useEffect(() => {
    dispatch(
      getAllCustomer({
        recordPerPage: 1000,
        keyword: keySearch.key || '',
      })
    );
  }, [dispatch, keySearch.key,res]);
  const movePage = ()=>{
        history.push('/customers/create-user')
  }
  useEffect(() => {
    dispatch({ type: CANCEL_REDIRECT });
  }, [data]);
  return (
    <div>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <h2 className="page-header">customers {isLoading ? <Spin /> : null}</h2>
        <Button onClick={movePage} type="primary">+ Add User</Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <EditTableUser data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
