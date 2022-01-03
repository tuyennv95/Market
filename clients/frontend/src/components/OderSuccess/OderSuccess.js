import React from 'react';
import { Result, Button } from 'antd';

const OderSuccess = () => {
    return (
        <div style={{padding: '50px 0'}}>
        <Result
        status="success"
        title="ĐẶT HÀNG THÀNH CÔNG!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Xem hóa đơn
          </Button>,
          <Button key="buy">Mua tiếp...</Button>,
        ]}
      />
      </div>
    )
};

export default OderSuccess;