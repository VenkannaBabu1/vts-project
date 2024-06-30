import React from 'react'
import SurveyorNav from './SurveyorNav'
import AboutUs from './AboutUs'
import WhyChoose from './WhyChoose'
import Footer from "./Footer"
import OfficialWebsitesSlider from './OfficialWebsitesSlider'
const SurveyorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <SurveyorNav/>

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

export default SurveyorDashboard