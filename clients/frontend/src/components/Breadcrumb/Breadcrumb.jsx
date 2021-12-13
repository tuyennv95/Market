import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import './style.css';
const BreadCrumb = () => {
  return (
    <div className="breadcrumb">
      <div className="container">
        <div className="breadcrum-main">
          <Breadcrumb>
            <Breadcrumb.Item >
              <Link className="breadcrum-link" style={{color: 'black'}} to="">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <Link className="breadcrum-link" style={{color: 'black'}} to="">Application Center</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <Link className="breadcrum-link" style={{color: 'black'}} to="">Application List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrum-link">An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumb;
