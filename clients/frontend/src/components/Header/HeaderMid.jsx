import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Input, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router";
import "./style.css";

const HeaderMid = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const dataCart = useSelector((state) => state.cart.listCart);
  const numberListCart = dataCart?.reduce((total, item) => total + item.quantily, 0)
 
  const onSearch = (value) => {
    navigate(`/search?key=${value}`)
  };
  const moveLink = () =>{
    navigate('/cart')
  }
  return (
    <>
      <div className="header-mid">
        <div className="container">
          <div className="header-mid_main">
            <Row align="middle " justify="center">
              <Col md={4} sm={6}>
                <Link to="/">
                  <img
                    alt=""
                    src="https://theme.hstatic.net/1000282430/1000544102/14/logo-in.png?v=1854"
                  />
                </Link>
              </Col>
              <Col justify="center" md={12} sm={8}>
                <Search
                  placeholder="Tìm kiếm sản phẩm, thương hiệu hay nhãn hàng mong muốn ……"
                  onSearch={onSearch}
                  enterButton
                />
              </Col>
              <Col md={3} sm={4} style={{ textAlign: "center" }}>
                <Badge count={numberListCart}>
                  <ShoppingCartOutlined onClick={moveLink}
                    style={{ fontSize: "30px", color: "#7CA877" }}
                  />
                </Badge>
              </Col>
              <Col md={5} sm={6}>
                <div className="header-mid_hotline">
                  Hotline: <b>099.999.9999</b>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderMid;
