import React, { useState, useEffect } from 'react';
import "../Partner/Partner.css"

const Partners = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex === logos.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Adjust interval as per your requirement (milliseconds)

    return () => clearInterval(interval);
  }, []);

  const logos = [
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/Policy_Bazar_12233c0433.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/mahindra_72507029a4.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/square_efed5185f1.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/policy_boss_16e61c78a1.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/symbo_ab6f794bdd.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/gramcover_5703c9ca39.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/risk_care_141e04ccbc.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/billdesk_4644692acf.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/Paytm_19bef0e1f3.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/logo_dark_0bf83d149c.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/Phone_Pay_b5194f17f1.png",
    "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/Roadzen_730b036706.png"
  ];

  return (
    <div className="partners">
      <div className="logos-slide" style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Partners;
