import React,{useEffect} from "react";
import "./style.css";
import { Row, Col, Button } from "antd";
import imgProduct from "Access/image/viet-quat.webp";
const ShowProductItem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="show-product-item">
      <div className="container">
        <div className="show-product-iteam-main">
          <Row gutter={[16, 16]} justify="center">
            <Col md={10} sm={10} xs={24}>
              <img src={imgProduct} alt="" className="show-product-item-img" />
            </Col>
            <Col md={14} sm={14} xs={24}>
              <div className="show-product-item-infor">
                <h2 className="infor-name">Cam NaVel 1Kg</h2>
                <div className="infor-item">
                  <p>Mã sản phẩm:</p>
                  <b>12365895</b>
                </div>
                <hr style={{marginBottom: '15px'}}/>
                
                <div className="infor-item">
                  <p>Xuất xứ:</p>
                  <b>12365895</b>
                </div>
                <hr  style={{marginBottom: '15px'}}/>

                <div className="infor-item">
                  <p>Quy cách đóng gói:</p>
                  <b>12365895</b>
                </div>
                <hr  style={{marginBottom: '15px'}}/>

                <div className="infor-item">
                  <p>Giá bán:</p>
                  <b>12365895</b>
                </div>
                <hr  style={{marginBottom: '15px'}}/>

                <div className="infor-item">
                  <p>Số lượng:</p>
                  <b>12365895</b>
                </div>
                <hr  style={{marginBottom: '15px'}}/>

                <div className="infor-item">
                  <p>Tổng tiền:</p>
                  <b style={{color: 'red', fontSize:'20px'}}>12365895</b>
                </div>


              </div>
                <Button style={{margin:'20px 0'}} type="primary" size="large">Thêm vào giỏ hàng</Button>
            </Col>
          </Row>
            <div className="show-product-item-des">
                <h2>Mô tả</h2>
                <hr/>
                <p>Trái Quýt được tuyển chọn tại vườn ở Đồng Bằng Sông Cửu Long, quýt có vị ngọt thanh, vỏ căng bóng, đẹp và tươi.
</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProductItem;
