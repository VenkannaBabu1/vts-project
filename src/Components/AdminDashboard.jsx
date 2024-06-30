import React from 'react'
import AdminNav from './AdminNav'
import AboutUs from './AboutUs'
import WhyChoose from './WhyChoose'
import Footer from './Footer'

import OfficialWebsitesSlider from './OfficialWebsitesSlider'
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <AdminNav />

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
  )
}

export default AdminDashboard