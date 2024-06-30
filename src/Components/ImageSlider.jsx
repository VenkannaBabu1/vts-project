import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";


const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className=" ">
      <Slider {...settings}>
        <div className=" ">
          <img src={image1} alt="Slide 1" className=" object-cover rounded-lg" />
        </div>
        <div className="w-full h-full">
          <img src={image2} alt="Slide 2" className="w-full h-full object-cover rounded-lg" />
        </div>
        
      </Slider>
    </div>
  );
};

export default ImageSlider;
