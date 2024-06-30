import React from 'react'
import Navbar from "../Components/Navbar/Navbar";
import Hero2 from "./Hero2";
import Footer from "./Footer";
import WhyChoose from "./WhyChoose";
import AboutUs from "./AboutUs";
import Accordian from "./Accordian";
import OfficialWebsitesSlider from "./OfficialWebsitesSlider";

const Homepage = () => {
  return (
    <div className="bg-gray-100">
    
    <Hero2 />
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <AboutUs />
      <WhyChoose />
      <OfficialWebsitesSlider />
      <Accordian />
      
    </main>
     
    <Footer />
  </div>
  )
}

export default Homepage