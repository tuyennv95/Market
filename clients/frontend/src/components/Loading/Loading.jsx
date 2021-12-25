import React from "react";
import "./style.css";
import {Spin} from 'antd';
const Loading = () => {
  return (
    <div className="spin">
     <p>Loading...</p> 
     <Spin size="large" />
    </div>
  );
}

export default Loading;
