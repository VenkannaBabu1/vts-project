import React from 'react';
import UserNav from './UserNav';
import AboutUs from "./AboutUs";
import WhyChoose from './WhyChoose';
import OfficialWebsitesSlider from './OfficialWebsitesSlider';
import Footer from "./Footer";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

      <section className="py-12 bg-white">
        <AboutUs />
      </section>

      <section className="py-12 bg-white">
        <WhyChoose />
      </section>

      <section className="py-12 bg-white">
        <OfficialWebsitesSlider />
      </section>

      <Footer />
    </div>
  );
};

export default UserDashboard;
