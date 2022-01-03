import React, { useState, useEffect } from "react";
import "./style.css";
import Slider from "react-slick";
import ProductDetail from "components/ProductDetail/ProductDetail";
import categoryApi from "api/categoryApi";
import productsApi from "api/productApi";
import { getProducts } from "store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
const ShowProductSame = ({ data }) => {
  const dispatch = useDispatch();
  const dataProductSame = useSelector((state) => state.products.listProducts);
  const [dataCate, setDataCate] = useState();
  useEffect(() => {
    categoryApi.getData().then((response) => setDataCate(response?.data));
  }, []);
  const arrayListSame = dataCate?.filter(
    (item) => item?.code === data?.categoryCode
  );
  const listCodeCategory = arrayListSame?.[0];
  const listCodeSame = listCodeCategory?.ancestorsCodes;
  useEffect(() => {
    if (listCodeSame) {
      dispatch(
        getProducts({
          categoryCode: listCodeSame[0],
        })
      );
    }
  }, [listCodeSame]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          //   infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <>
      {dataProductSame && (
        <div className="show-product-same">
          <div className="container">
            <div className="show-product-same-main">
              <h2>Một số mặt hàng liên quan</h2>
              <Slider {...settings}>
                {dataProductSame.map((e) => (
                  <div key={e.code}>
                    <ProductDetail data={e}/>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProductSame;
