import React, { useState, useEffect } from "react";
// import imageProduct from "Access/image/viet-quat.webp";
import "./styles.css";
import { InputNumber, notification,Skeleton  } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { converterMoney } from "utils/converterMoney";
import { addToCart } from "store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductDetail = ({ data }) => {
  const [number, setNumber] = useState(1);
  const valueCart = useSelector((state) => state.cart.listCart);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();
  function onChange(value) {
    setNumber(value);
  }

  function totalMoney() {
    if (data.price.priceSale) {
      return converterMoney(data.price.priceSale * number);
    } else {
      return converterMoney(data.price.price * number);
    }
  }

  const addCart = async () => {
    const listAdd = await dispatch(
      addToCart({
        id: data.code,
        quantily: number,
        price: data.price.priceSale || data.price.price,
        total: data.price.priceSale * number || data.price.price * number,
        product: data,
      })
    );
    if (listAdd.payload) {
      openNotificationWithIcon("success");
    }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      description:
        `Thêm thành công ${number} sản phẩm ${data?.name.toUpperCase()} vào giỏ hàng.`,
      onClick: console.log('aa')
      
    });
  };

  useEffect(() => {
      valueCart?.map((item) =>{
      if(item?.id === data?.code){
        setNumber(item.quantily);
      }})
  },[valueCart,data?.code])
  if(isLoading) return <Skeleton />
  return (
    <>
      {data && (
        <div className="product-detail">
          <div className="container">
            <div className="product-detail-main">
              <div className="product-detail-hien">
                <Link
                  to={`/product/${data?.code}`}
                  style={{ overflow: "hidden", maxWidth: "100%" }}
                >
                  <img
                    alt=""
                    className="product-detail-img"
                    src={data?.image}
                  />
                </Link>
                <div className="product-detail-title">
                  <Link to={`/product/${data?.code}`}>
                    <h5 className="product-detail-name">{data?.name}</h5>
                  </Link>
                  {/* <div style={{display: 'flex',justifyContent: 'space-around'}}> */}

                  <p
                    className={`product-detail-price ${
                      data.price.priceSale && data.price.priceSale > 0 ? "pdT" : ""
                    }`}
                  >
                    {data.sale && data.price.priceSale && data.price.priceSale > 0
                      ? converterMoney(data.price.priceSale)
                      : converterMoney(data.price.price)}
                  </p>
                  {data.sale && data.price.priceSale && data.price.priceSale !== 0 ? (
                    <p className="product-detail-priceSale">
                      {converterMoney(data.price.price)}
                    </p>
                  ) : null }

                  {/* </div> */}
                </div>
              </div>
              <div className="product-detail-hidden">
                <p className="product-detail-origin">
                  Xuất xứ: <b>{data.origin}</b>
                </p>
                <p className="product-detail-weight">
                  Quy cách đóng gói: <b>{data.unit}</b>
                </p>
                <InputNumber
                  controls="true"
                  min={1}
                  max={10}
                  defaultValue={1}
                  value={number}
                  onChange={onChange}
                />
                <div className="product-toggle-cart">
                  <p className="product-detail-total">
                    Total: <b>{totalMoney()}</b>
                  </p>
                  <ShoppingCartOutlined
                    onClick={addCart}
                    style={{ fontSize: "22px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetail;
