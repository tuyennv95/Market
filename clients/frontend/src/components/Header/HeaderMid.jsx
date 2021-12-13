import React from "react";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Badge } from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import "./style.css";
const HeaderMid = () => {
  const { Search } = Input;
  const onSearch = () => {};
  return (
    <>
      <div className="header-mid">
        <div className="container">
          <div className="header-mid_main">
            <Row align="middle " justify="center">
              <Col md={4} sm={6}>
                <img alt="" src="https://theme.hstatic.net/1000282430/1000544102/14/logo-in.png?v=1854" />
              </Col>
              <Col justify="center" md={12} sm={8}>
                <Search
                  placeholder="Tìm kiếm sản phẩm, thương hiệu hay nhãn hàng mong muốn ……"
                  onSearch={onSearch}
                  enterButton
                />
              </Col>
              <Col md={3} sm={4} style={{textAlign: 'center'}}>
                <Badge count={1} >
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#7CA877' }}/>
                </Badge>
              </Col>
              <Col md={5} sm={6} >
                <div className="header-mid_hotline">
                    Hotline: <b>0903.166.228</b>
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
