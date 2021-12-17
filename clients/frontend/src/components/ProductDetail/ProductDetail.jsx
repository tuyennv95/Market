import React from "react";
import imageProduct from "Access/image/viet-quat.webp";
import "./styles.css";
import { InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const ProductDetail = () => {
  function onChange(value) {
    console.log("changed", value);
  }
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-main">
          <div className="product-detail-hien">
            <Link to="" style={{ overflow: "hidden", maxWidth: "100%" }}>
              <img alt="" className="product-datail-img" src={imageProduct} />
            </Link>
            <div className="product-detail-title">
              <Link to="">
                <h5 className="product-detail-name">Việt quất</h5>
              </Link>
              <p className="product-detail-price">500.000đ</p>
            </div>
          </div>
          <div className="product-detail-hidden">
            <p className="product-detail-origin">
              Xuất xứ: <b>Việt Nam</b>
            </p>
            <p className="product-detail-weight">
              Quy cách đóng gói: <b>500g</b>
            </p>
            <InputNumber
              controls="true"
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChange}
            />
            <div className="product-toggle-cart">
              <p className="product-detail-total">
                Total: <b>1000.000đ</b>
              </p>
              <ShoppingCartOutlined
                style={{ fontSize: "22px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
