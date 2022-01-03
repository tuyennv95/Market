import React from "react";
import Slider from "react-slick";
import './styles.css'
import img1 from 'Access/image/tp1.jpg';
import img2 from 'Access/image/tp2.jpg';
import img3 from 'Access/image/tp3.jpg';
import img4 from 'Access/image/tp4.jpg';
import img5 from 'Access/image/tp5.jpg';
import img6 from 'Access/image/tp6.jpg';
import img7 from 'Access/image/tp7.png';
import img8 from 'Access/image/tp8.jpg';
import img9 from 'Access/image/tp9.png';
import img10 from 'Access/image/tp10.jpg';
const SliderProduct = ()=> {
  
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="sliderProduct">
        
        <Slider {...settings}>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img1} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img2} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img3} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img4} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img5} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img6} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img7} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img8} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img9} alt=""/>
          </div>
           <div style={{width: '90%', height: '90%!important'}}>
            <img src={img10} alt=""/>
          </div>
         
        </Slider>
      </div>
    );
  }
 export default SliderProduct;