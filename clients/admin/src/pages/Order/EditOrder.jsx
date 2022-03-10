import React, { useEffect, useState } from "react";
import { getOrder } from "redux/actions/AsyncOrder";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button,message, notification } from "antd";
import { money } from "utils/money";
import "./style.css";
import { editOrderAct } from "redux/actions/AsyncOrder";
const EditOrder = (props) => {
  const { Option } = Select;
  const { isLoading,redirect } = useSelector((state) => state.LoadingReducer);
  const { order } = useSelector((state) => state.OrderReducer);
  const id = props.match.params.id;
  const {errEdit} = useSelector((state) => state.OrderReducer);
  const [state, setState] = useState();
  const openNotification = (err) => {
    notification.open({
      // message: 'Notification Title',
      description: err,
      
    });
  };
  useEffect(()=>{
    if(errEdit){
      openNotification(errEdit);
    }
  },[errEdit])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder([id]));
  }, []);
  function handleChange(value) {
    setState(value);
  }
  useEffect(() => {
    setState(order?.status);
  }, [order]);
  const saveEditOrder = () =>{
    dispatch(editOrderAct({
        code: order?.code,
        status: state,
    }))
  }
  const success = () => {
    message.success('Thay đổi thành công');
  };
  useEffect(() => {
    if(redirect){
        success();
    }
  },[redirect])
  return (
    <div>
      <h2>Chỉnh sửa hóa đơn</h2>

      {order && (
        <div className="edit-order">
          <div className="edit-order-item">
            <p className="edit-order-item-key">ID đơn hàng</p>
            <p className="edit-order-item-value">{order.code}</p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Trạng thái</p>
            <p className="edit-order-item-value">
              <Select
                value={state}
                style={{ width: 150 }}
                onChange={handleChange}
              >
                <Option value="NEW">Mới</Option>
                <Option value="PENDING">Chờ xác nhận</Option>
                <Option value="CONFIRMED">Đã xác nhận</Option>
                <Option value="PREPARE">Chuẩn bị hàng</Option>
                <Option value="WAIT_FOR_PACKING">Chờ lấy hàng</Option>
                <Option value="DELIVERING">Đang giao hàng</Option>
                <Option value="DELIVERED">Đã giao</Option>
                <Option value="COMPLETED">Hoàn thành</Option>
                <Option value="CANCELLED">Đã hủy</Option>
                <Option value="LOST">Thất lạc</Option>
                <Option value="BACK_GOODS">Hoàn hàng</Option>
              </Select>
            </p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Ghi chú</p>
            <p className="edit-order-item-value">{order.customerNote}</p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Địa chỉ</p>
            <p className="edit-order-item-value">{order.address}</p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Tài khoản</p>
            <div className="acc">
              <p className="edit-order-item-value">ID: {order.customer.code}</p>
              <p className="edit-order-item-value">
                Name: {order.customer.fullName}
              </p>
              <p className="edit-order-item-value">
                userName: {order.customer.username}
              </p>
            </div>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Tên khách hàng</p>
            <p className="edit-order-item-value">{order.receiverName}</p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Số điện thoại</p>
            <p className="edit-order-item-value">{order.receiverPhone}</p>
          </div>
          {order?.receiverPhone2 && (
            <div className="edit-order-item">
              <p className="edit-order-item-key">Liên lạc 2</p>
              <p className="edit-order-item-value">{order.receiverPhone2}</p>
            </div>
          )}
          <div className="edit-order-item">
            <p className="edit-order-item-key">Sản phẩm</p>
            <div className="edit-order-item-value value1">
              <div className="products">
                {order.products.map((i) => (
                  <div className="product-item">
                    <img src={i.image} alt="" />
                    <p>
                      {i.name}({i.unit})
                    </p>
                    <p>SL: {i.quantity}</p>
                    <p>Đơn Giá: {money(i.price)}</p>
                    <p>Thành tiền: {money(i.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Phí(Ship)</p>
            <p className="edit-order-item-value value2">
              {money(order.otherAmount)}
            </p>
          </div>
          <div className="edit-order-item">
            <p className="edit-order-item-key">Thành tiền</p>
            <p className="edit-order-item-value value2">
              {money(order.amount)}
            </p>
          </div>
          <div className="button">
            <Button onClick={saveEditOrder} type="primary">Lưu đơn hàng</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrder;
