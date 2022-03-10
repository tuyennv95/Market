import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "store/orderSlice";
import { useParams } from "react-router";
import { Steps } from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import moment from "moment";
import HistoryOrderItem from "./HistoryOrderItem";
import { converterMoney } from "utils/converterMoney";
import { Button } from "antd";
import Template from "components/Template/Template";
import { checkStatus } from "utils/checkStatus";
const OrderDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { order } = useSelector((state) => state.order);
  const param = useParams();
  const { Step } = Steps;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetail(param?.id));
  }, [dispatch, param.id]);
  const products = order?.products;
  const htmlPdf = (
    <div className="hoadon">
      <div className="container">
        <div className="hoadon-main">
          <div className="title-hoadon">HÓA ĐƠN THANH TOÁN</div>
          <p>-------oOo-------</p>
          <p>Ngày........Tháng.........Năm..........</p>
          <div className="box">
            <div className="nguoiban">
              <p>Đơn vị bán hàng: </p>
              <p>Mã số thuế: </p>
              <p>Địa chỉ: </p>
              <p>Số điẹn thoại: </p>
            </div>
            <hr />
            <div className="nguoimua">
              <p>Họ và tên người mua: </p>
              <p>Tên đơn vị: </p>
              <p>Mã số thuế: </p>
              <p>Địa chỉ: </p>
              <p>Số điẹn thoại: </p>
            </div>
            <hr />
          </div>
          <div className="table">
            <table border="1">
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
              {products?.map((item, index) => (
                <tr key={item.code}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{converterMoney(item?.price)}</td>
                  <td>{item?.quantity}</td>
                  <td>{converterMoney(item?.amount)}</td>
                </tr>
              ))}
              <tr>
                <td colspan="4">Tổng giá</td>
                <td colspan="4">{converterMoney(order?.amountProduct)}</td>
              </tr>
              <tr>
                <td colspan="4">Phí + ship</td>
                <td colspan="4">{converterMoney(order?.otherAmount)}</td>
              </tr>
              <tr>
                <td colspan="4">Tổng cộng</td>
                <td colspan="4">{converterMoney(order?.amount)}</td>
              </tr>
            </table>
          </div>
          <p style={{ textAlign: "left", margin: "10px 0" }}>
            Số tiền viết bằng chữ:...........................................{" "}
          </p>
          <hr />
          <div className="bottom">
            <p>
              Người mua hàng <br /> <i>(Ký ghi rõ họ tên)</i>
            </p>
            <p>
              Người bán hàng <br /> <i>(Ký ghi rõ họ tên)</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const time7 = (time)=>{
    return moment.utc(time, 'DD/MM/YYYY HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss');

  }
  const checkTime = (status) => {
    if (status === "NEW") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "NEW")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "NEW"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "PENDING") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "PENDING")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "PENDING"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "CONFIRMED") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "CONFIRMED")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "CONFIRMED"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "PREPARE") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "PREPARE")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "PREPARE"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "WAIT_FOR_PACKING") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "WAIT_FOR_PACKING")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "WAIT_FOR_PACKING"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "DELIVERING") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "DELIVERING")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "DELIVERING"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "DELIVERED") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "DELIVERED")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "DELIVERED"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else if (status === "COMPLETED") {
      if (
        order?.orderStatusHistories.filter((item) => item.status === "COMPLETED")
          .length !== 0
      ) {
        return time7(order?.orderStatusHistories.filter(
          (item) => item.status === "COMPLETED"
        )[0].createdDate);
      } else {
        return "Update...";
      }
    } else {
      return "Update...";
    }
  };
  const checkDot = order?.status === 'NEW' ? 1 : order?.status === 'PENDING' ? 2 :  order?.status === 'CONFIRMED' ? 3 :  order?.status === 'PREPARE' ? 4 : order?.status === 'WAIT_FOR_PACKING' ? 5 :  order?.status === 'DELIVERING' ? 6 :  order?.status === 'DELIVERED' ? 7 : order?.status === 'COMPLETED' ? 8 : 9;
  return (
    <div className="orderDetail">
      <div className="container">
        <h2
          style={{
            padding: "50px 0 20px 0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Hóa đơn chi tiết
        </h2>
        <div className="order-detail-main">
          <div className="order-id">
            <p style={{ color: "red", fontWeight: 700 }}>
              {" "}
              {checkStatus(order?.status)}
            </p>
            <p>ID ĐƠN HÀNG: {order?.code}</p>
          </div>
          {order?.status !== "CANCELLED" &&
          order?.status !== "LOST" &&
          order?.status !== "BACK_GOODS" ? (
            <div>
              <div className="timeline pd-timeline">
                <Steps current={checkDot}>
                  <Step title="Mới" description={checkTime('NEW')}/>
                  <Step
                    title="Chờ xác nhận"
                    description={checkTime('PENDING')}
                  />

                  <Step
                    title="Đã xác nhận"
                    description={checkTime('CONFIRMED')}
                  />
                  <Step
                    title="Chuẩn bị hàng"
                    description={checkTime('PREPARE')}
                  />
                </Steps>
              </div>
              <div className="timeline1 pd-timeline">
                <Steps current={checkDot} initial={4}>
                  <Step
                    title="Chờ lấy hàng"
                    description={checkTime('WAIT_FOR_PACKING')}
                  />
                  <Step
                    title="Đang giao hàng"
                    description={checkTime('DELIVERING')}
                  />
                  <Step title="Đã giao" description={checkTime('DELIVERED')} />
                  <Step title="Hoàn thành" description={checkTime('COMPLETED')} />
                </Steps>
              </div>
            </div>
          ) : (
            <div>
              <div className="timeline">
                <CheckCircleOutlined className="icon-timeline icon-timeline-left" />
                <InfoCircleOutlined className="icon-timeline icon-timeline-right" />
              </div>
              <div className="text-order">
                <p>Đơn hàng đã đặt</p>
                <p>{order?.status === "CANCELLED" ? 'Đã Hủy' : order?.status === "LOST" ? 'Thất Lạc' : "Hoàn Hàng"}</p>
              </div>
              <div className="time-order">
                <p>{order?.createdDate}</p>
                <p>{order?.lastModifiedDate}</p>
              </div>
            </div>
          )}
          <div className="address">
            <h2>Địa chỉ nhận hàng</h2>
            <div className="add-order">
              <p className="name-add-order">{order?.receiverName}</p>
              <p className="phone-add-order">(+84){order?.receiverPhone}</p>
              <p className="phone-add-order">{order?.receiverPhone2}</p>
              <p>{order?.address ? `${order?.address}` : "Đang cập nhật..."}</p>
            </div>
          </div>
          <div className="products-order">
            <div className="product-item-order">
              <HistoryOrderItem key={order?.code} data={order} check={true} />
            </div>
          </div>

          <div className="total-order">
            <div className="total-order-item">
              <p className="item-key">Tổng tiền hàng</p>
              <p className="item-value">
                {" "}
                {converterMoney(order?.amountProduct)}
              </p>
            </div>
            <div className="total-order-item">
              <p className="item-key">Phí vận chuyển</p>
              <p className="item-value">
                {" "}
                {converterMoney(order?.otherAmount)}
              </p>
            </div>
            <div className="total-order-item">
              <p className="item-key">Tổng số tiền</p>
              <p
                className="item-value"
                style={{ color: "red", fontWeight: 700 }}
              >
                {" "}
                {converterMoney(order?.amount)}
              </p>
            </div>
            <div className="total-order-item">
              <p className="item-key">
                <ShoppingCartOutlined
                  style={{ color: "red", fontSize: "16px" }}
                />
                Phương thức vận chuyển
              </p>
              <p className="item-value" style={{ color: "blue" }}>
                COD{" "}
              </p>
            </div>
            <div className="total-order-item" style={{ padding: "20px" }}>
              {/* {htmlPdf} */}
              <Template data={htmlPdf} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
