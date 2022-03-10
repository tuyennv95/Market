import React from "react";
import { Row, Col } from "antd";
import {
  CarOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.css";
const FooterMid = () => {
  return (
    <div className="footer-mid">
      <div className="container">
        <div className="footer-mid-main">
          <Row gutter={[24, 24]} justify="center">
            <Col md={8} sm={24} xs={24} style={{textAlign: 'center'}}>
              <div className="footer-mid-main-item">
                <CarOutlined
                  className="footer-mid-item-icon"
                  style={{ color: "#184002", fontSize: "40px" }}
                />
                <Link to="/chinh-sach-van-chuyen-doi-tra-2021">
                  <p className="footer-mid-main-link">
                    Chính sách vận chuyển & đổi trả
                  </p>
                </Link>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-mid-main-item">
                <ShoppingCartOutlined
                  className="footer-mid-item-icon"
                  style={{ color: "#184002", fontSize: "40px" }}
                />
                <div>
                  <Link to="">
                    <p className="footer-mid-main-link">
                      Chính sách bảo mật thông tin
                    </p>
                  </Link>
                  <p className="footer-mid-content">
                    Hệ thống thanh toán thẻ trên website NAMANMARKET được cung
                    cấp bởi các đối tác cổng thanh toán đã được cấp phép hoạt
                    động hợp pháp tại Việt Nam
                  </p>
                </div>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-mid-main-item">
                <CreditCardOutlined
                  className="footer-mid-item-icon"
                  style={{ color: "#184002", fontSize: "40px" }}
                />
                <div>
                  <Link to="">
                    <p className="footer-mid-main-link">
                      Chính sách thanh toán
                    </p>
                  </Link>
                  <p className="footer-mid-content">
                    Thanh toán bằng phương thức thanh toán nhanh và an toàn
                    nhất.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default FooterMid;
