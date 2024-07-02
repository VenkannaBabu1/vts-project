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
  let tx = 0;

  const slideForward = () => {
    if (tx > -20) {
      tx -= 20;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 10) {
      tx += 20;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/policy/get-all-policies`);
      console.log(response.data);
      setPolicies(response.data);
    } catch (error) {
      console.error('Error in fetching policies:', error);
    }
  };

  const handleClick = (type, policyId, policyName) => {
    switch(type) {
      case "HEALTH":
        navigate("/healthForm", { state: { policyId:policyId, policyName:policyName } });
        break;
      case "LIFE":
        navigate("/lifeForm", { state: { policyId:policyId, policyName:policyName } });
        break;
      case "TRAVEL":
        navigate("/travelForm", { state: { policyId:policyId, policyName:policyName } });
        break;
      case "HOME":
        navigate("/homeForm", { state: { policyId:policyId, policyName:policyName } });
        break;
      case "VEHICLE":
        navigate("/vehicleForm", { state: { policyId:policyId, policyName:policyName } });
        break;
      default:
        break;
    }
  };

  if (policies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

    <div className="testimonials relative mt-0 ">
      <img src={next_icon} alt="Next" className="next-btn" onClick={slideForward} />
      <img src={back_icon} alt="Back" className="back-btn" onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider} >
          {policies.map((policy, index) => (
            <li key={index}>
              <div className="slide-card mb-2 ">
                <div className="user-info">
                  <div className="mt-2 mb-0 ">
                    <h1 className="policy-name text-[20px] text-slate-600 font-bold">
                      {policy.policyName}
                    </h1>
                    <h2 className="font-semibold text-[15px]">
                      POLICY ID: {policy.policyId}
                    </h2>
                    <h2>
                      PREMIUM: <span className="text-blue-500">{policy.premium}</span>
                    </h2>
                  </div>
                </div>
                <hr className="w-full border-1 border-slate-800" />
                <div className="bg-blue-100 mt-3 px-1 py-1 rounded-xl">
                  <h3 className="mt-1 mb-1 text-[14px]">
                    COVERAGE: <span className="text-orange-500">{policy.coverage}</span>
                  </h3>
                </div>
                <div className="items-start space-x-2 bg-blue-100 rounded-xl px-2 mt-3 p-1">
                  <h3 className="text-[11.5px] font-semibold ml-1">
                    TERMS AND CONDITIONS:
                  </h3>
                  <span className="space-x-2 w-full  text-[11px] px-2 mb-5">{policy.description}</span>
                </div>
                <button
                  className="sea w-[200px] ml-9 hover:bg-orange-500 hover:text-white rounded-xl pb-2 "
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
