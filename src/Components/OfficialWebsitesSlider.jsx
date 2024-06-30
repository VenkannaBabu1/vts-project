import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gpay from "../assets/gpay.jpg"
import phonepay from "../assets/phonepay.jpeg"

const OfficialWebsitesSlider = () => {
  const officialWebsites = [
    { name: "PhonePe", url: "https://www.phonepe.com", logo:phonepay },
    { name: "Paytm", url: "https://paytm.com", logo: "https://m.economictimes.com/thumb/msid-107312198,width-1200,height-900,resizemode-4,imgsize-6574/paytm-etonline.jpg" },
    { name: "Google Pay", url: "https://pay.google.com", logo:gpay } // { name: "Amazon Pay", url: "https://www.amazonpay.in", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9usZD-fR_5unupsqw_Cv_ygIIQJFVzl1MQ&s" }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-8 bg-gray-100 text-center">
      <div className='mb-8'>
        <h2 className="text-2xl font-bold">Official Partners</h2>
      </div>
      <div className='max-w-6xl mx-auto'>
        <Slider {...sliderSettings}>
          {officialWebsites.map((site) => (
            <div key={site.name} className='p-4'>
              <a href={site.url} target='_blank' rel='noopener noreferrer'>
                <img src={site.logo} alt={site.name} className='w-full max-h-40 object-contain' />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OfficialWebsitesSlider;
