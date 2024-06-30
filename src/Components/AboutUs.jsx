import React, { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const AboutUs = () => {
  const [counter, setCounter] = useState(false);

  const data = [
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon5_0b03e9afb5.png',
      header: 7160034,
      info: 'Policies Issued',
    },
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon4_68794f8213.png',
      header: 3220573,
      info: 'Claims Settled',
    },
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon3_5fd2cf8afd.png',
      header: 7926,
      info: 'Cashless Workshops',
    },
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon1_26db2fc2c3.png',
      header: 4000,
      info: 'Network Hospitals',
    },
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon2_4e932432b8.png',
      header: 1200,
      info: ' Network Offices',
    },
    {
      img: 'https://oicl-cms-media.s3.ap-south-1.amazonaws.com/icon5_0b03e9afb5.png',
      header: 95.49,
      info: 'Settlement Ratio',
    },
  ];

  return (
    <ScrollTrigger onEnter={() => setCounter(true)} onExit={() => setCounter(false)}>
      <div className="container mx-auto py-12">
        <div className="header mb-10">
          <h1 className="text-3xl text-center font-bold">Our Milestones & The Road Ahead</h1>
        </div>
        <div className="card-section flex justify-center space-x-4">
          {counter &&
            data.map((info, index) => (
              <div
                key={index}
                className="card bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center transition border-2 border-transparent hover:border-orange-500"
              >
                <img src={info.img} alt={info.info} className="w-16 h-16 mb-4" />
                <CountUp start={0} end={info.header} delay={0} duration={2.5} className="text-2xl font-bold" />
                <p className="mt-2 text-gray-700">{info.info}</p>
              </div>
            ))}
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default AboutUs;
