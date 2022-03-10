import React, { useState, useEffect } from "react";
import ShopCartItem from "./ShopCartItem";
import { Row, Col, Select, Radio, Input, Space } from "antd";
import "./style.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { converterMoney } from "utils/converterMoney";
import { useNavigate } from "react-router-dom";
import orderApi from "api/orderApi";
import { resetCart } from "store/cartSlice";
import { getAllOrders } from "store/orderSlice";

const { Option } = Select;

const ShopCart = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listDataCart = useSelector((state) => state.cart.listCart);
  const [quan, setQuan] = useState();
  const [phuong, setPhuong] = useState();
  const [key, setKey] = useState();
  const [adrQuan, setAdrQuan] = useState("");
  const [adrPhuong, setAdrPhuong] = useState("");
  const [total, setTotal] = useState(0);
  const dataOrders = useSelector((state) => state.order.orders);
  const [diachi, setDiaChi] = useState(null);
  const token = useSelector((state) => state?.user?.currentUser?.data?.result);
  const { adr } = useSelector((state) => state.order);
  console.log("🚀 ~ adr", adr);
  const url = "https://vapi.vnappmob.com";

  function onChangeQuan(value, key) {
    setKey(key.key);
    setAdrQuan(value);
  }
  function onChangePhuong(value) {
    setAdrPhuong(value);
  }
  useEffect(() => {
    axios
      .get(`${url}/api/province/district/01`)
      .then((response) => setQuan(response.data.results));
  }, []);

  useEffect(() => {
    if (key) {
      axios
        .get(`${url}/api/province/ward/${key}`)
        .then((response) => setPhuong(response.data.results));
    }
  }, [key]);
  useEffect(() => {
    setTotal(
      listDataCart?.reduce(
        (total, item) => total + item.price * item.quantily,
        0
      )
    );
  }, [listDataCart]);
  useEffect(() => {
    setStateAdr(0);
  }, [adr]);
  const [stateAdr, setStateAdr] = useState(null);
  function onChangeAdr(e) {
    setStateAdr(e.target.value);
  }
  const onSubmit = async (value) => {
    const products = [];
    for (let i = 0; i < listDataCart.length; i++) {
      products.push({
        code: listDataCart[i]?.id,
        quantity: listDataCart[i].quantily,
      });
    }
    const data = {
      ...value,
      quan: adrQuan,
      phuong: adrPhuong,
      products: products,
    };
    const dataAdr =
      stateAdr === 0
        ? `${data?.address} ${data?.phuong} ${data?.quan} TP.Hà Nội`
        : stateAdr;
    orderApi
      .createOrder({
        address: dataAdr,
        customerNote: data?.note,
        products: [...data?.products],
        receiverName: data?.fullName,
        receiverPhone: data?.phone,
        receiverPhone2: data?.email,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(resetCart());
          navigate(`/order-success/${response.data?.result?.code}`);
        }
      })
      .catch((err) => console.log(err));
  };
  // const listAdr = [...adr, "Khác"]
  // console.log('🚀 ~ listAdr', listAdr);

  return (
    <div className="shop-cart">
      <div className="container">
        <div className="shop-cart-main">
          <h2 style={{ textTransform: "uppercase", marginTop: "30px" }}>
            Giỏ hàng
          </h2>
          {listDataCart?.length !== 0 ? (
            <div className="shop-cart-key">
              <Row>
                <Col md={10} sm={10} sx={24}>
                  <div className="shop-cart-item-key">Sản phẩm</div>
                </Col>
                <Col md={4} sm={4} sx={24}>
                  <div className="shop-cart-item-key">Giá bán lẻ</div>
                </Col>
                <Col md={4} sm={4} sx={24}>
                  <div className="shop-cart-item-key">Số lượng</div>
                </Col>
                <Col md={4} sm={4} sx={24}>
                  <div className="shop-cart-item-key">Tổng tiền</div>
                </Col>
                <Col md={2} sm={2} sx={24}>
                  <div className="shop-cart-item-key">Xóa</div>
                </Col>
              </Row>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                style={{ margin: " 0 auto" }}
                src="https://uchimart.com/assets/images/no-cart.png"
                alt=""
                className="sr"
              />
              <br />
              <br />
              <h2 style={{}}>GIỎ HÀNG TRỐNG</h2>
            </div>
          )}
          {listDataCart?.map((item) => (
            <ShopCartItem key={item.id} data={item} />
          ))}
        </div>
        {listDataCart?.length > 0 && (
          <div className="shop-cart-mid">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <h2>Phí:</h2>
              <b>
                {total <= 300000 ? converterMoney(30000) : converterMoney(0)}
              </b>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <h2>Thành tiền:</h2>
              <b>
                {total <= 300000
                  ? converterMoney(total + 30000)
                  : converterMoney(total)}
              </b>
            </div>
          </div>
        )}
        {listDataCart?.length > 0 && (
          <div className="shop-cart-bot">
            <h2 style={{ textTransform: "uppercase" }}>Thông tin khách hàng</h2>

            <div className="shopr-cart-bot">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  placeholder="Họ và tên"
                  type="text"
                  {...register("fullName", { required: true, maxLength: 80 })}
                />
                <input
                  placeholder="Email"
                  type="text"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                <input
                  placeholder="Số điện thoại"
                  type="tel"
                  {...register("phone", {
                    required: true,
                    maxLength: 11,
                    minLength: 8,
                  })}
                />
                <input
                  placeholder="Ghi chú"
                  type="text"
                  {...register("note", { required: false, maxLength: 800 })}
                />
                {adr && adr.length !== 0 ? (
                  <>
                    <h4
                      style={{
                        fontSize: "15px",
                        paddingLeft: "15px",
                        color: "#757981",
                        paddingTop: "10px",
                      }}
                    >
                      Địa chỉ
                    </h4>
                    <Radio.Group
                      onChange={onChangeAdr}
                      value={stateAdr}
                      style={{ marginLeft: "15px" }}
                    >
                      <Space direction="vertical">
                        <Radio value={0}>
                          More...
                          {stateAdr === 0 ? (
                            <div style={{ marginLeft: "30px" }}>
                              <input
                                placeholder="Địa chỉ giao hàng"
                                type="text"
                                {...register("address", {
                                  required: true,
                                  maxLength: 80,
                                })}
                              />
                              <div className="select">
                                <Select name="tinh" defaultValue="Hà Nội">
                                  <Option value={"Hà Nội"}>Hà Nội</Option>
                                </Select>

                                <Select
                                  showSearch
                                  placeholder="Chọn quận/huyện"
                                  optionFilterProp="children"
                                  onChange={onChangeQuan}
                                >
                                  {quan?.map((item) => (
                                    <Option
                                      key={item.district_id}
                                      value={item?.district_name}
                                    >
                                      {item?.district_name}
                                    </Option>
                                  ))}
                                </Select>

                                <Select
                                  showSearch
                                  placeholder="Chọn phường/xã"
                                  optionFilterProp="children"
                                  onChange={onChangePhuong}
                                >
                                  {phuong?.map((item) => (
                                    <Option
                                      key={item.ward_id}
                                      value={item.ward_name}
                                    >
                                      {item.ward_name}
                                    </Option>
                                  ))}
                                </Select>
                              </div>
                            </div>
                          ) : null}
                        </Radio>
                        {adr?.map((item) => (
                          <Radio value={item}>{item}</Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </>
                ) : (
                  <>
                    <input
                      placeholder="Địa chỉ giao hàng"
                      type="text"
                      {...register("address", {
                        required: true,
                        maxLength: 80,
                      })}
                    />
                    <div className="select">
                      <Select name="tinh" defaultValue="Hà Nội">
                        <Option value={"Hà Nội"}>Hà Nội</Option>
                      </Select>

                      <Select
                        showSearch
                        placeholder="Chọn quận/huyện"
                        optionFilterProp="children"
                        onChange={onChangeQuan}
                      >
                        {quan?.map((item) => (
                          <Option
                            key={item.district_id}
                            value={item?.district_name}
                          >
                            {item?.district_name}
                          </Option>
                        ))}
                      </Select>

                      <Select
                        showSearch
                        placeholder="Chọn phường/xã"
                        optionFilterProp="children"
                        onChange={onChangePhuong}
                      >
                        {phuong?.map((item) => (
                          <Option key={item.ward_id} value={item.ward_name}>
                            {item.ward_name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </>
                )}
                <input type="submit" value="Đặt hàng" />
                {/* <Button type="submit"> */}
                {/* <CircularProgress size={20}/> */}
                {/* Thanh Toán</Button> */}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCart;
