import React, { useState , useEffect} from "react";
import "./style.css";
import { Row, Col, InputNumber, Button } from "antd";
import {converterMoney} from 'utils/converterMoney';
import {delCartItem,addToCart} from 'store/cartSlice';
import { useDispatch } from "react-redux";
const ShopCartItem = ({ data }) => {
  const dispatch = useDispatch()
  const [value1, setValue1] = useState(1);
  function onChange(value) {
    setValue1(value);
    console.log(value)
    dispatch(addToCart({
      id: data?.id,
      quantily: value,
      price: data?.price,
      total: data?.price * value,
      product: data?.product
    }));
  }

  useEffect(() => {
    setValue1(data.quantily)
  },[data.quantily])
  const removeCartItem = () => {
    dispatch(delCartItem({id:data?.id}))
  }

  return (
    <div className="shop-cart-item">
      {data && (
        <div className="container">
          <div className="shop-cart-item-main">
            <Row style={{padding: '0 0 20px 0'}}>
              <Col md={10} sm={10} sx={24}>
                <div className="shop-cart-item-value">
                  <h3 className="shop-cart-item-name">{data?.product?.nameDisplay}</h3>

                  <img src={data?.product?.image} alt="" className="shop-cart-item-img" />
                </div>
              </Col>
              <Col md={4} sm={4} sx={24}>
                <p className="shop-cart-item-money">{converterMoney(data?.price)}</p>
              </Col>
              <Col md={4} sm={4} sx={24}>
                <InputNumber
                  min={1}
                  max={10}
                  value={value1}
                  onChange={onChange}
                />
              </Col>
              <Col md={4} sm={4} sx={24}>
                <p className="shop-cart-item-money">{converterMoney(value1 * data?.price)}</p>
              </Col>
              <Col md={2} sm={2} sx={24}>
                <Button onClick={removeCartItem} type="primary">Xóa</Button>
              </Col>
            </Row>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopCartItem;
