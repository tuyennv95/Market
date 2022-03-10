import React, { useEffect, useState } from "react";
import "./style.css";
import { Row, Col, Button, InputNumber, notification,Tag } from "antd";
import { converterMoney } from "utils/converterMoney";
import { addToCart } from "store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import parse from 'html-react-parser';

const ShowProductItem = ({ data }) => {
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataListCart = useSelector((state) => state.cart.listCart);
  useEffect(() => {
    dataListCart?.map((item) => {
      if (item.id === data?.code) {
        setNumber(item.quantily);
      }
    });
  }, [data?.code, dataListCart]);

  const onChange = (value) => {
    setNumber(value);
  };

  const price1 =
    data?.sale === true && data?.price.priceSale && data?.price.priceSale !== 0
      ? data?.price.priceSale
      : data?.price.price;
  const price2 =
    data?.sale === true && data?.price.priceSale && data?.price.priceSale !== 0
      ? data?.price.price
      : 0;
  const total = number * price1;

  const addCart = async () => {
    const listAdd = await dispatch(
      addToCart({
        id: data.code,
        quantily: number,
        price: price1,
        total: total,
        product: data,
      })
    );
    if (listAdd.payload) {
      openNotificationWithIcon("success");
    }
    // console.log({
    //   id: data.code,
    //    quantily: number,
    //    price: price1,
    //      total: total,
    //    product: data,})
  };
  
  const openNotificationWithIcon = (type) => {
    notification[type]({
      description: `Thêm thành công ${number} sản phẩm ${data?.name.toUpperCase()} vào giỏ hàng.`,
      onClick: () => {
        navigate('/cart')
      },
    });
  };
  return (
    <>
      {data && (
        <div className="show-product-item">
          <div className="container">
            <div className="show-product-iteam-main">
              <Row gutter={[16, 16]} justify="center">
                <Col md={10} sm={10} xs={24}>
                  <img
                    src={data.image}
                    alt=""
                    className="show-product-item-img"
                  />
                </Col>
                <Col md={14} sm={14} xs={24}>
                  <div className="show-product-item-infor">
                    <h2 className="infor-name">
                      {data?.nameDisplay} {data?.unit}
                    </h2>
                    <div className="infor-item">
                      <p>Mã sản phẩm:</p>
                      <b>{data?.code}</b>
                    </div>
                    <hr style={{ marginBottom: "15px" }} />

                    <div className="infor-item">
                      <p>Xuất xứ:</p>
                      <b>{data?.origin}</b>
                    </div>
                    <hr style={{ marginBottom: "15px" }} />

                    <div className="infor-item">
                      <p>Quy cách đóng gói:</p>
                      <b>{data?.unit}</b>
                    </div>
                    <hr style={{ marginBottom: "15px" }} />

                    <div className="infor-item">
                      <p>Giá bán:</p>
                      <b>{converterMoney(price1)}</b>
                      {data?.sale &&
                        data?.price.priceSale &&
                        data?.price.priceSale !== 0 && (
                          <p
                            style={{
                              padding: "5px 0px 0px 10px",
                              fontSize: "12px",
                              textDecorationLine: "line-through",
                            }}
                          >
                            {converterMoney(price2)}
                          </p>
                        )}
                    </div>
                    <hr style={{ marginBottom: "15px" }} />

                    <div className="infor-item">
                      <p>Số lượng:</p>
                      <InputNumber
                        min={1}
                        max={data?.quantity}
                        defaultValue={0}
                        value={data?.quantity <=0 ? 0 : number}
                        onChange={onChange}
                      />
                    </div>
                    <hr style={{ marginBottom: "15px" }} />
                    <div className="infor-item">
                      <p>Còn lại:</p>
                      <Tag color="magenta">{data?.quantity}</Tag>
                    </div>
                    <hr style={{ marginBottom: "15px" }} />

                    <div className="infor-item">
                      <p>Tổng tiền:</p>
                      <b style={{ color: "red", fontSize: "20px" }}>
                        {converterMoney(total)}
                      </b>
                    </div>
                  </div>
                  <Button
                    disabled={data?.quantity <= 0 ? true : false}
                    style={{ margin: "20px 0" }}
                    type="primary"
                    size="large"
                    onClick={addCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Col>
              </Row>
              <div className="show-product-item-des">
                <h2>Mô tả</h2>
                <hr />
                <div>
                  {parse(data?.note || "Đang cập nhật...")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProductItem;
