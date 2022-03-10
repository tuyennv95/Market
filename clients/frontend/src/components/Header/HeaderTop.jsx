import React,{useEffect} from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Affix } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/userSlice";
import jwt_decode from "jwt-decode";

const HeaderTop = () => {
  const token = useSelector((state) => state?.user?.currentUser?.data?.result);
  console.log('🚀 ~ token', token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moveLink = () => {
    navigate("/cart");
  };
  const userName = useSelector((state) => state.user?.userName);
  const dataCart = useSelector((state) => state.cart.listCart);
  const numberListCart = dataCart?.reduce(
    (total, item) => total + item.quantily,
    0
  );
  const clickLog = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
 
  return (
    <Affix offsetTop={0}>
      <div className="header-top">
        <div className="container">
          <div className="header-top_main" style={{ paddingTop: "5px" }}>
            <ul className="phone-wrap">
              <li>
                <PhoneOutlined style={{ fontSize: "24px", color: "#08c" }} />
                <Link className="link phone-header" to="/">
                  099 999 9999
                </Link>
              </li>
            </ul>

            <ul className="ht-menu">
              <li>
                {token ? (
                  <div className="show-active-login">
                    <div className="setting-user">
                      <p className="hello-username">Chào {userName}</p>
                      <div className="dropdown">
                        <Link
                          style={{ color: "black" }}
                          to="/history?tab=1"
                          className=" fix-link-color dropdown-toggle"
                        >
                          Đơn hàng của tôi
                        </Link>
                        <Link
                          style={{ color: "black" }}
                          to="/love"
                          className=" fix-link-color dropdown-toggle"
                        >
                          Sản phẩm yêu thích
                        </Link>
                        <Link
                          style={{ color: "black" }}
                          to="/change-password"
                          className=" fix-link-color dropdown-toggle"
                        >
                          Đổi mật khẩu
                        </Link>
                      </div>
                    </div>
                    <Badge
                      size="small"
                      offset={[-18, 5]}
                      count={numberListCart}
                    >
                      <ShoppingCartOutlined
                        onClick={moveLink}
                        style={{
                          fontSize: "20px",
                          color: "#7CA877",
                          padding: "0 20px",
                        }}
                      />
                    </Badge>
                    <p className="logOut link-logout" onClick={clickLog}>
                      Đăng xuất
                    </p>
                  </div>
                ) : (
                  <Link
                    style={{ fontSize: "14px", color: "black" }}
                    to="/login"
                    className=""
                  >
                    {" "}
                    Đăng nhập{" "}
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Affix>
  );
};

export default HeaderTop;
