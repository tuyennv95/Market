import React, { useState, useEffect } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";
import {useDispatch, useSelector} from 'react-redux';

import user_image from "../../assets/images/tuat.png";
import { money } from "utils/money";
import user_menu from "../../assets/JsonData/user_menus.json";
import { LOG_OUT } from "constan/types";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
const curr_user = {
  display_name: "ADMIN",
  image: user_image,
};


const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const Topnav = (props) => {
  const {orders} = useSelector((state) => state.OrderReducer)
  const orderNotification = orders?.filter((item) => item.status === 'NEW')

  const dispatch = useDispatch();
  const loca = useLocation();
  const notifications = orderNotification?.map((item) => ( 
    {
      "icon": "bx bx-cart",
      "content": `Khách hàng ${item?.customer?.code}_${item?.customer?.username} vừa đặt đơn hàng ${item?.code}. Đơn giá ${money(item.amount)} vào lúc ${ moment.utc(item.createdDate, 'DD/MM/YYYY HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}. Xem ngay... `,
      "path": `/order/edit-order/${item?.code}`
    }
  ))

  const path = loca.pathname;
  // const check = path?.lastIndexOf("/");
  // console.log(path?.slice(0,10))
  // console.log('🚀 ~ check', check);
  // const pathSlice = check !== 0 ? path : path?.slice(0,10)
  // console.log('🚀 ~ pathSlice', pathSlice);
  
  const renderUserMenu = (item, index) => (
    <Link to="/" key={index} onClick={() => clickLogOut(item)}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );
  const renderNotificationItem = (item, index) => (
    <a href={item.path} key={index}>
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
    </a>
  );
  useEffect(()=>{
    setSearch('')
  }, [path])
  const clickLogOut = (item) => {
    if (item.content === "Logout") {
      localStorage.removeItem("token");

      dispatch({ type: LOG_OUT });
    }
  };
  const [search, setSearch] = useState('');
    console.log('🚀 ~ search', search);

  const changeTextSearch = (e) => {
    const {value } = e.target;
    setSearch(value);
  };
  const history = useHistory();
  const setSearchBtn = () => {
 history.push(`${path}?key=${search}`);
    
  };
  return (
    <div className="topnav">
        <div className="topnav__search">
      {path !== "/" && (
          <>
          <input
            name="search"
            value={search}
            onChange={(e) => changeTextSearch(e)}
            type="text"
            placeholder="Search here..."
          />

          <i onClick={setSearchBtn} className="bx bx-search"></i>
          </>
          )}
        </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
                    <Dropdown
                        orderNew={true}
                        icon='bx bx-bell'
                        badge={orderNotification?.length}
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                    />
                    
                </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
