import React from "react";
import { Row, Col, Button } from "antd";
import ProductDetail from "components/ProductDetail/ProductDetail";
import "./style.css";
const ShowProducts = () => {
    const submitButton=()=>{
        console.log('aaa')
    }
  return (
    <div className="show-products">
      <div className="container">
        <div className="show-products-main">
          <Row
            justify="space-between"
            style={{ flexWrap: "wrap" }}
            gutter={[8, 16]}
            align="middle"
          >
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
            <Col className="styleCol" md={6} sm={8} xs={12}>
              <ProductDetail />
            </Col>
          </Row>
          <Button type="primary" onClick={submitButton} style={{margin: '200px 0 30px 0'}}>
          Xem thêm
        </Button>
        </div>
        
      </div>
    </div>
  );
};
export default ShowProducts;
