import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const slides = [
    { id: 1,header:"Policy Management", content: 'View,update and Manage your Policies directly from the app' },
    { id: 2, content: 'Slide 2 Content' },
    { id: 3, content: 'Slide 3 Content' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden">
          <div className="img-section">
            <img src="" alt="" />
          </div>
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex-shrink-0 flex items-center justify-center bg-white p-8"
          >
            {slide.content}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-orange-500' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
