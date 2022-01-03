import React from "react";
import { Tabs } from "antd";
import { StepBackwardOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const HistoryBuy = () => {

   
  return (
    <div className="history">
      <div className="container">
          <h2 style={{padding:'50px 0 20px 0' , textTransform:'uppercase', fontWeight:'bold'}}>Lịch sử mua hàng</h2>
        <div className="history-main">
          <Tabs  defaultActiveKey="1" centered size="large" tabBarGutter={100} style={{backgroundColor: 'rgb(143 143 179 / 33%)'}}>
            <TabPane tab="Tất cả" key="1" >
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Chờ" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Thành công" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Hủy" key="4">
              Content of Tab Pane 4
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HistoryBuy;
