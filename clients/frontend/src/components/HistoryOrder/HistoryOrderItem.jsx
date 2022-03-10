import React from "react";
import "./style.css";
import productsApi from "api/productApi";
import { converterMoney } from "utils/converterMoney";
import { Button, Popconfirm, message, Empty } from "antd";
import { useNavigate } from "react-router";
import { checkStatus } from "utils/checkStatus";
import orderApi from "api/orderApi";
import moment from "moment";
import dayjs from "dayjs";
// import moment from "moment-timezone"
const HistoryOrderItem = ({ data, check }) => {
  const navigate = useNavigate();
  const movePage = (code) => {
    navigate(`/product/${code}`);
  };
  const movePageOrder = () => {
    navigate(`/order/${data.code}`);
  };
  const huyOrder = async () => {};
  async function confirm(e) {
    const huy = await orderApi.huyOrder({
      code: data?.code,
      status: "CANCELLED",
    });
    if (huy?.status == 200) {
      message.success("Hủy thành công");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
  function cancel(e) {
    message.error("Click on No");
  }
  
  // const m2 = moment(`${data?.createdDate}`, 'DD/MM/YYYY HH:mm:ss').utc().format("DD/MM/YYYY HH:mm:ss")
  // const m2 = moment(`${data?.createdDate}`, "DD/MM/YYYY HH:mm:ss").local().format("DD/MM/YYYY HH:mm:ss")
  // const m2 = moment(`${data?.createdDate}`, 'DD/MM/YYYY HH:mm:ss a').local().format('DD/MM/YYYY HH:mm:ss')
  // const m2 = dayjs(`${data?.createdDate}`, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") 
  // const m2 = dayjs(`${data?.createdDate}`, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") 
  // console.log('🚀 ~ m2', m2);
  
const m2 = moment.utc(`${data?.createdDate}`, 'DD/MM/YYYY HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss');
 
  return (
    <div className="historyOrderItem">
      {data && (
        <div className="container1">
          {!check && (
            <div className="check">
              <p style={{ paddingRight: "15px" }} className="">
                {m2}
              </p>
              <p className="status">{checkStatus(data?.status)}</p>
            </div>
          )}

          {data?.products?.map((item) => (
            <div
              className="item"
              key={item.code}
              style={{
                display: "flex",
                padding: "5px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <img className="img-order-item" src={item.image} />
              <div className="text">
                <p className="name">{item?.name}</p>
                <p className="quantily">x{item?.quantity}</p>
              </div>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {converterMoney(item.price)}
              </p>
              <Button
                onClick={() => movePage(item.code)}
                type="primary"
                className="button"
              >
                Xem sản phẩm
              </Button>
            </div>
          ))}
          {!check && (
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p className="total">
                Tổng số tiền: {converterMoney(data.amount)}
              </p>
              <Button onClick={movePageOrder} type="dashed" className="button2">
                Xem hóa đơn chi tiết
              </Button>
              {data?.status !== "COMPLETED" &&
                data?.status !== "DELIVERED" &&
                data?.status !== "CANCELLED" && (
                  <Popconfirm
                    title="Bạn muốn hủy đơn hàng này?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      onClick={huyOrder}
                      type="dashed"
                      className="button2"
                    >
                      Hủy đơn hàng
                    </Button>
                  </Popconfirm>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryOrderItem;
