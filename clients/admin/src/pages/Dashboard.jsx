import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";
import queryString from 'query-string';

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/EditTableUser";
import {money} from 'utils/money';
import {money2} from 'utils/money2';
import Badge from "../components/badge/Badge";
import userApi from 'config/userApi';
import productApi from 'config/productApi';
import orderApi from 'config/orderApi';
// import statusCards from "../assets/JsonData/status-card-data.json";
import { getAllCategory } from "redux/actions/AsyncCategory";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "redux/actions/AsyncOrder";
import TableTopCustomer from "components/table/TableTopCustomer";
import TableTopProduct from "components/table/TableTopProduct";
const chartOptions = {
  series: [
    {
      name: "Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Order",
      data: [30, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
    {
      name: "Products",
      data: [20, 10, 20, 60, 50, 26, 60, 10, 21, 50],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9", "red"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};


const Dashboard =  () => {
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [dataUser, setDataUser] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const {orders} = useSelector((state) => state.OrderReducer)
  const totalOrder = orders?.filter((item) => item.status === "COMPLETED")
 
  let moneyT = 0;
  for(let i =0; i<totalOrder.length;i++){
    moneyT += totalOrder[i].amount;
  }
  const dataUserTop = dataUser?.filter((item) => item.moneySpent >= 100000);
  const dataProductsTop = dataProduct?.filter((item) => item.quantityBuy > 0);
  const dispatch = useDispatch();
  useEffect(async ()=>{
      const cUser = await userApi.getCountUser({
        recordPerPage: 10000,
      })
      const cProduct = await productApi.getCountProduct({
        recordPerPage: 10000,
      })
      const cOrder = await orderApi.getCountOrder({
        recordPerPage: 10000,
      })
      const gUser = await userApi.getCustomers({
        recordPerPage: 10000,
      })
      const gProduct = await productApi.getProducts({
        recordPerPage: 10000,
      })
      
      setCountUser(cUser?.data?.result);
      setCountProduct(cProduct?.data?.result)
      setCountOrder(cOrder?.data?.result)
      setDataUser(gUser?.data)
      setDataProduct(gProduct?.data)
  },[countUser])
  useEffect(() => {
    dispatch(
      getAllOrder({
        recordPerPage: 1000,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getAllCategory({
        recordPerPage: 1000,
      })
    );
  }, [dispatch]);

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const statusCards = [
    {
        "icon": "bx bx-user",
        "count": `${countUser}`,
        "title": "Total Customer"
    },
    {
        "icon": "bx bx-face",
        "count": `${countProduct}`,
        "title": "Total Products"
    },
    {
        "icon": "bx bx-dollar-circle",
        "count": `${money2(moneyT)}`,
        "title": "Total income"
    },
    {
        "icon": "bx bx-receipt",
        "count": `${countOrder}`,
        "title": "Total orders"
    }
]

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <TableTopCustomer data={dataUserTop}/>
            </div>
            <div className="card__footer">
              <Link to="/customers">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>top orders</h3>
            </div>
            <div className="card__body">
              <TableTopProduct data={dataProductsTop}/>
            </div>
            <div className="card__footer">
              <Link to="/orders">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
