import React from "react";
import "./style.css";
import Slider from "react-slick";
import ProductDetail from "components/ProductDetail/ProductDetail";
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
const ShowProductSame = () => {
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
    <div className="show-product-same">
      <div className="container">
        <div className="show-product-same-main">
            <h2>Một số mặt hàng liên quan</h2>
          <Slider {...settings}>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
            <div>
              <ProductDetail />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ShowProductSame;
