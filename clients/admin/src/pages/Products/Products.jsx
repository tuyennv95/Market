import React,{useEffect} from "react";
import TableProduct from "components/table/TableProduct";
import { Button, Spin } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { getAllPRoduct } from "redux/actions/AsyncProduct";
import { useHistory } from "react-router";
const Products = () => {
    const {isLoading} = useSelector((state) => state.LoadingReducer);
    const {product} = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getAllPRoduct({
            recordPerPage: 1000,

        }))
    },[])
    const movePage = () =>{
        history.push('/products/add-product')
    }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="page-header">customers {isLoading ? <Spin /> : null}</h2>
        <Button onClick={movePage} type="primary">
          + Add Product
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <TableProduct data={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
