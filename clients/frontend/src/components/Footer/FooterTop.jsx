import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

import "./style.css";
const FooterTop = () => {
  return (
    <div className="footer-top">
      <div className="container">
        <div className="footer-top-main">
          <Row gutter={4} justify="space-between">
            <Col md={6} sm={24} xs={24}>
              <img
                src="https://theme.hstatic.net/1000282430/1000544102/14/logo-in.png?v=1854"
                alt=""
                className="footer-top-logo"
              />
              <Link to="">
                <p className="footer-top-contact-text">
                  <PhoneOutlined
                    style={{
                      fontSize: "16px",
                      color: "gray",
                      paddingRight: "5px",
                    }}
                  />{" "}
                  0989554045
                </p>
              </Link>
              <Link to="">
                <p className="footer-top-contact-text">
                  <MailOutlined
                    style={{
                      fontSize: "16px",
                      color: "gray",
                      paddingRight: "5px",
                    }}
                  />{" "}
                  testMail@gmail.com
                </p>
              </Link>
            </Col>
            <Col md={18} sm={24} xs={24}>
              <Row gutter={[8, 8]} justify="center">
                <Col md={6} sm={12} xs={24}>
                  <p className="footer-top-menu-title">Giới thiệu</p>
                  <ul className="footer-top-menu-list">
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Về chúng tôi
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Tin tức
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Khuyến mại
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Tuyển dụng
                      </Link>
                    </li>
                  </ul>
                </Col>

                {/* -------------------  */}
                <Col md={6} sm={12} xs={24}>
                  <p className="footer-top-menu-title">Sống khỏe</p>
                  <ul className="footer-top-menu-list">
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Kiến thức sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Cẩm nang sống khỏe
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Công thức nấu ăn
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Video Clip
                      </Link>
                    </li>
                  </ul>
                </Col>

                {/* -------------------  */}
                <Col md={6} sm={12} xs={24}>
                  <p className="footer-top-menu-title">Sản phẩm</p>
                  <ul className="footer-top-menu-list">
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Hoa quả
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Thịt và trứng
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        Gia vị và phụ liệu
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-top-menu-item-link" to="">
                        hải sản
                      </Link>
                    </li>
                  </ul>
                </Col>

                {/* -------------------  */}
                <Col md={6} sm={12} xs={24}>
                  <p className="footer-top-menu-title">Giờ mở cửa</p>
                  <ul className="footer-top-menu-list">
                    <li className="footer-top-menu-item-link">
                      21 Thảo Điền, Phường Thảo Điền, Thành phố Thủ Đức 7h00 –
                      21h30 Từ Thứ Hai đến Chủ Nhật <br /> Cửa hàng: 028
                      3519.1610
                    </li>
                    <li className="footer-top-menu-item-link">
                      303 Nguyễn Văn Trỗi, Phường 1, Quận Tân Bình 8h00 – 22h00
                      Từ Thứ Hai đến Chủ Nhật <br />
                      Cửa hàng: 028 3842.1275
                    </li>
                    <li className="footer-top-menu-item-link">
                      06 Nguyễn Thị Minh Khai, Phường Đakao ,Quận 1 7h00 – 21h30
                      Từ Thứ Hai đến Chủ Nhật <br/>Cửa hàng: 028 3636 8325
                    </li>
                  </ul>
                </Col>

                {/* -------------------  */}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default FooterTop;
