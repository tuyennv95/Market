import React,{useEffect} from 'react';
import { Result, Button } from 'antd';
import { useParams, useNavigate } from 'react-router';
const OrderSuccess = (props) => {
  const param = useParams();
  const navigate = useNavigate();
const movePageOrder = () =>{
  navigate(`/order/${param?.id}`)
}
const buy = ()=>{
  navigate(`/`)

}
useEffect(() => {
  window.scrollTo(0, 0);
}, [])
    return (
        <div style={{padding: '50px 0'}}>
        <Result
        status="success"
        title="ĐẶT HÀNG THÀNH CÔNG!"
        subTitle={`Order number: ${param?.id}. Chúng tôi sẽ gọi xác nhận đơn hàng trong 30 phút.`}
        extra={[
          <Button onClick={movePageOrder} type="primary" key="console">
            Xem hóa đơn
          </Button>,
          <Button onClick={buy} key="buy">Mua tiếp..</Button>,
        ]}
      />
      </div>
    )
};

export default OrderSuccess;