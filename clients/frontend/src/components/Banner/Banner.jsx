import React from "react";
import Slider from "components/Slider/Slider";
import imageBanner from 'Access/image/banner1.jpg';
import imageBanner2 from 'Access/image/banner2.jpg';
import imageBanner3 from 'Access/image/banner3.jpg';
import imageBanner4 from 'Access/image/banner4.jpg';

import './style.css';

import { Row, Col } from "antd";
const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-main">
          <Row className="banner-main-row" justify="space-between">
            <Col lg={16} md={16} sm={24} xs={24}>
              <Slider style={{height:'370px'}}/>
            </Col>
            <Col lg={7} md={7} sm={7} xs={7}>
                <img alt="" src={imageBanner}/>
                <img alt="" src={imageBanner2}/>
                <img alt="" src={imageBanner3}/>
                <img alt="" src={imageBanner4}/>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Banner;
