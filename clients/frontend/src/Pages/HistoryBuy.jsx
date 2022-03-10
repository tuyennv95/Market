import React, { useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import { StepBackwardOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "store/orderSlice";
import HistoryOrder from "components/HistoryOrder/HistoryOrder";
import { useNavigate, useLocation } from "react-router";
import queryString from "query-string";

const { TabPane } = Tabs;
const HistoryBuy = () => {
  const navigate = useNavigate();
  const params = useLocation();

  // // console.log('🚀 ~ useParams', params);
  const id = queryString.parse(params?.search).tab;
  const dispatch = useDispatch();
  const dataOrders = useSelector((state) => state.order.orders);
  const tab =
    id == 1
      ? null
      : id == 2
      ? "NEW"
      : id == 3
      ? "PENDING"
      : id == 4
      ? "CONFIRMED"
      : id == 5
      ? "PREPARE"
      : id == 6
      ? "WAIT_FOR_PACKING"
      : id == 7
      ? "DELIVERING"
      : id == 8
      ? "DELIVERED"
      : id == 9
      ? "CANCELLED"
      : id == 10
      ? "LOST"
      : id == 11
      ? "BACK_GOODS"
      : "COMPLETED";
  // const tab = id == 1 ? null : id == 2 ? "NEW" : id == 3 ? "PENDING" : id == 4 ?  "CONFIRMED" : id == 5 ?  "PREPARE" : id == 6 ? "WAIT_FOR_PACKING" : id == 7 ? "DELIVERING" : id == 8 : id == 9 ? "DELIVERED" : id == 10 ? "CANCELLED" : '';
  // console.log('🚀 ~ tab', tab);

  useEffect(() => {
    dispatch(
      getAllOrders({
        recordPerPage: 1000,
        status: tab,
      })
    );
  }, [dispatch, id]);
  const onTab = (e) => {
    navigate(`/history?tab=${e}`);
  };
  return (
    <div className="history" style={{ backgroundColor: "#F4F2F2" }}>
      <div className="container">
        <h2
          style={{
            padding: "50px 0 20px 0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Lịch sử mua hàng
        </h2>
        <div className="history-main">
          <Tabs
            onTabClick={(e) => onTab(e)}
            activeKey={id}
            tabPosition="left"
            size="large"
            tabBarGutter={10}
            style={{ backgroundColor: "#f4f2f2" }}
          >
            <TabPane tab="Tất cả" key="1">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Mới" key="2">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Chờ xác nhận" key="3">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Đã xác nhận" key="4">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Chuẩn bị hàng" key="5">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Chờ lấy hàng" key="6">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Đang giao hàng" key="7">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Đã giao" key="8">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Đã hủy" key="9">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Thất lạc" key="10">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Hoàn hàng" key="11">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
            <TabPane tab="Hoàn thành" key="12">
              {dataOrders?.length !== 0 ? (
                <HistoryOrder data={dataOrders} />
              ) : (
                <Empty />
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HistoryBuy;
