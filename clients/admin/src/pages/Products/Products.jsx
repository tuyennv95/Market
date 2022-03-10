import React,{useEffect, useState} from "react";
import TableProduct from "components/table/TableProduct";
import { Button, Spin,Select, InputNumber } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { getAllPRoduct } from "redux/actions/AsyncProduct";
import { useHistory } from "react-router";
import { getAllCategory } from "redux/actions/AsyncCategory";
import queryString from "query-string"
const Products = (props) => {
const keySearch =  queryString.parse(props.location.search);
const { Option } = Select;

    const {isLoading} = useSelector((state) => state.LoadingReducer);
    const {products} = useSelector((state) => state.ProductReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const [select, setSelect] = useState('null');
    useEffect(()=>{
        dispatch(getAllPRoduct({
            keyword: keySearch.key || '',
            recordPerPage: 1000,
            isSale: select,

        }))
    },[keySearch.key,select])
    const movePage = () =>{
        history.push('/products/add-product')
    }
    useEffect(() => {
      dispatch(
        getAllCategory({
          recordPerPage: 1000,
        })
      );
    }, [dispatch]);
    const handleChange = (value) =>{
      setSelect(value)
    }
    const [searchNumberProduct, setSearchNumberProduct] = useState();
    const handleChangeInput = (value) =>{
      setSearchNumberProduct(value)
    }
    const filterData = searchNumberProduct ? products.filter((item) => item.quantity <= searchNumberProduct ) : products;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="page-header">Products {isLoading ? <Spin /> : null}</h2>
        <Button onClick={movePage} type="primary">
          + Add Product
        </Button>
      </div>
        <Select value={select} style={{ width: 150 }} onChange={handleChange}>
        <Option value="null">Tất cả</Option>
        <Option value="true">ON SALE</Option>
        <Option value="false">OFF SALE</Option>
       
      </Select>
      {/* <Input value={searchNumberProduct} onChange={handleChangeInput} placeholder="Nhập số lượng..." style={{ width: '20%' }}/> */}
      <InputNumber value={searchNumberProduct} min={1} max={10000000000} placeholder="Nhập số lượng..." onChange={handleChangeInput} style={{ width: '15%' }}/>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <TableProduct data={filterData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
