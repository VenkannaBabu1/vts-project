import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllPolicies.css";
import Footer from "./Footer";
import UserNav from './UserNav';
import next_icon from "../assets/next-icon.png";
import back_icon from "../assets/back-icon.png";

function AllPolicies() {
  const navigate = useNavigate();
  const slider = useRef();
  const [tx, setTx] = useState(0);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      slideForward();
    }, 7000); 

    return () => clearInterval(interval); 
  }, [tx, policies]);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/policy/get-all-policies`);
      console.log(response.data);
      setPolicies(response.data);
    } catch (error) {
      console.error('Error in fetching policies:', error);
    }
  };

  const slideForward = () => {
    setTx((prevTx) => {
      const newTx = prevTx - 100 / 3;
      return newTx < -100 * (policies.length / 3) ? 0 : newTx;
    });
  };

  const slideBackward = () => {
    setTx((prevTx) => {
      const newTx = prevTx + 100 / 3;
      return newTx > 0 ? -100 * ((policies.length - 3) / 3) : newTx;
    });
  };

  useEffect(() => {
    if (slider.current) {
      slider.current.style.transition = 'transform 0.5s ease';
      slider.current.style.transform = `translateX(${tx}%)`;
    }
  }, [tx]);

  const handleClick = (type, policyId, policyName) => {
    switch(type) {
      case "HEALTH":
        navigate("/healthForm", { state: { policyId, policyName } });
        break;
      case "LIFE":
        navigate("/lifeForm", { state: { policyId, policyName } });
        break;
      case "TRAVEL":
        navigate("/travelForm", { state: { policyId, policyName } });
        break;
      case "HOME":
        navigate("/homeForm", { state: { policyId, policyName } });
        break;
      case "VEHICLE":
        navigate("/vehicleForm", { state: { policyId, policyName } });
        break;
      default:
        break;
    }
  };

  if (policies.length === 0) {
    return <div>Loading...</div>;
  }

  const clonedPolicies = [...policies, ...policies, ...policies]; 

  return (
    <div className="min-h-screen bg-gray-100 ">
      <UserNav />
      <div className="testimonials relative mt-10 mb-10   px-10">
        <img src={next_icon} alt="Next" className="next-btn" onClick={slideForward} />
        <img src={back_icon} alt="Back" className="back-btn" onClick={slideBackward} />
        <div className="slider">
          <ul ref={slider} style={{ display: 'flex', transition: 'transform 0.5s ease' }}>
            {clonedPolicies.map((policy, index) => (
              <li key={index} style={{ flex: '0 1 33.333%' }}>
                <div className="slide-card">
                  <div className="user-info">
                    <h1 className="policy-name">{policy.policyName}</h1>
                    <h2 className="policy-details">POLICY ID: {policy.policyId}</h2>
                    <h2 className="policy-premium">PREMIUM: {policy.premium}</h2>
                  </div>
                  <div className="policy-coverage">
                    <h3 className="h6">COVERAGE: <span className="text-orange-500">{policy.coverage}</span></h3>
                  </div>
                  <div className="policy-description">
                    <h3 className="h6">TERMS AND CONDITIONS:</h3>
                    <span >{policy.description}</span>
                  </div>
                  <button
                    className="policy-button"
                    onClick={() => handleClick(policy.type, policy.policyId, policy.policyName)}
                  >
                    Apply now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllPolicies;
