import React from 'react';

const WhyChoose = () => {
  const info = [
    {
      img: "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/why2_442df4d4ba.png",
      header: "High Claim Settlement Ratio",
      info: "95.49% Claim settlement Ratio for FY 2023-24."
    },
    {
      img: "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/why1_21d0c9950f.png",
      header: "Trustworthy & Dependable",
      info: "76+ years in service of the nation."
    },
    {
      img: "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/why4_dc7df542d5.png",
      header: "Customer First",
      info: "Customer Friendly approach. We protect what matters most to our Customers."
    },
    {
      img: "https://oicl-cms-media.s3.ap-south-1.amazonaws.com/why3_3abc59a32f.png",
      header: "Customer Support",
      info: "24*7*365 support to Customers with a dedicated team of 7000+ employees; 60000+ Agents & POSPs; 1200+ offices and an advanced Online Platform"
    }
  ];

  return (
    <div className="container mx-auto p-6 " id='about'>
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl mb-4">Why Choose VTS Insurance</h1>
        <p className="text-lg mb-2">We protect you, your future and the things you care about!!</p>
        <p className="text-lg font-semibold">An "Indian" Brand, Owned by Indians. Operated by Indians.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {info.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <img src={data.img} alt={data.header} className="w-24 h-24 object-contain mb-4" />
            <h2 className="font-semibold text-xl mb-2">{data.header}</h2>
            <p className="text-gray-700">{data.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
