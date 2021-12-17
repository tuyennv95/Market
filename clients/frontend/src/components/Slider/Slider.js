import React from 'react';
import './styles.css';
import classNames from 'classnames';
export default class App extends React.Component {

  constructor(props) {
   
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);


  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    const slides = [
      {
        city: 'Hà Nội',
        // country: 'Thủ đô đầy nắng',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
        link: 'facebook.com',
      },
      {
        city: 'TP. Hồ Chí Minh',
        // country: 'France',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
        link: 'youtube.com',
      },
      {
        city: 'Hội An',
        // country: 'Czech Republic',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
      },
      {
        city: 'Đà Lạt',
        // country: 'Netherlands',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
      },
      {
        city: 'Đà Nẵng',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
      },
      {
        city: 'Nha Trang',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
      },
      {
        city: 'Vũng Tàu',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
      },
      {
        city: 'Quảng Ninh',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        link: 'facebook.com'
      },
    ];
    window.clearTimeout(this.changeTO);
    // this.length = this.props.slides.length;
    // const { length } =this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = slides.length - 1;
    if (activeSlide >= slides.length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });


  }



  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    const slides = [
      {
        city: 'Hà Nội',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
        link: '/provinces/01',
      },
      {
        city: 'TP. Hồ Chí Minh',
        // country: 'France',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
        link: '/provinces/79',

      },
      {
        city: 'Lâm Đồng',
        // country: 'Netherlands',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
        link: '/provinces/68',

      },
      {
        city: 'Đà Nẵng',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        link: '/provinces/48',

      },

      {
        city: 'Vũng Tàu',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        link: '/provinces/77',

      },
      {
        city: 'Quảng Ninh',
        // country: 'Russia',
        img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
        link: '/provinces/22',
      },
    ];
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        <p className="slider__top-heading">Lựa chọn những căn hộ chung cư, nhà riêng hoàn hảo tại các điểm đến được yêu thích nhất</p>
        <div className="slider__slides">
          {slides.map((slide, index, id) => (
            <div
              className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index })}
              key={slide.city}
            >
              <div className="slider__slide-content">
                {/* <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3> */}
                <h2 className="slider__slide-heading">
                  {slide.city.split('-').map(l => <span key={id}>{l}</span>)}
                </h2>
                <a href={slide.link}><p className="slider__slide-readmore">Xem...
                <i className="fa fa-hand-o-right" aria-hidden="true"></i>

                </p></a>

              </div>
              <div className="slider__slide-parts">
                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}

