import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAllPolicies.css";
import Footer from "./Footer";
import UserNav from './AdminNav';
import next_icon from "../assets/next-icon.png";
import back_icon from "../assets/back-icon.png";
import { ToastContainer, toast } from "react-toastify";

function AllPolicies() {
  const navigate = useNavigate();
  const slider = useRef();
  const [tx, setTx] = useState(0);
  const token = localStorage.getItem("token");

  const slideForward = () => {
    setTx(prevTx => (prevTx > -10 ? prevTx - 10 : prevTx));
  };

  const slideBackward = () => {
    setTx(prevTx => (prevTx < 10 ? prevTx + 10 : prevTx));
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

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_URL}/policy/delete-policy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      toast.success("Deleted successfully...!", { position: "top-center" });
      setPolicies(policies.filter(policy => policy.id !== id)); 
    })
    .catch(error => {
      toast.error("Error in deleting policy...!", { position: "top-center" });
      console.error('Error in deleting policy:', error);
    });
  };

  const handleClick = (id, type, policyId, policyName, coverage, description) => {
    navigate("/edit-policy", {
      state: { id, type, policyId, policyName, coverage, description }
    });
  };

  if (policies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />
      <div className="testimonials1 relative mt-0">
        <img src={next_icon} alt="Next" className="next-btn" onClick={slideForward} />
        <img src={back_icon} alt="Back" className="back-btn" onClick={slideBackward} />
        <div className="slider1">
          <ul ref={slider} style={{ transform: `translateX(${tx}%)`, transition: 'transform 0.5s ease' }}>
            {policies.map((policy, index) => (
              <li key={index}>
                <div className="slide-card1 ">
                <div className="user-info">
                  <div className="">
                    <h1 className="policy-name ">
                      {policy.policyName}
                    </h1>
                    <h2 className="policy-details">
                      POLICY ID: {policy.policyId}
                    </h2>
                    <h2  className="policy-premium">
                      PREMIUM: {policy.premium}
                    </h2>
                  </div>
                </div>
                  {/* <hr className="w-full border-2 border-slate-800" /> */}
                <div >
                  <h3 className="policy-coverage ">
                    COVERAGE: <span className="text-orange-500">{policy.coverage}</span>
                  </h3>
                </div>
                  <div className="policy-description">
                  <h3 className="h6">
                    TERMS AND CONDITIONS:
                  </h3>
                  <span >{policy.description}</span>
                  </div>
                
                  <button
                    className="policy-button w-[230px] ml-2 mt-1 hover:bg-blue-500 hover:text-white rounded-xl pb:0"
                    onClick={() => handleClick(policy.id, policy.type, policy.policyId, policy.policyName, policy.coverage, policy.description)}
                  >
                    Edit now
                  </button>
                  <button className="policy-button w-[230px] ml-2 mt-2  hover:text-white rounded-xl pb:1" onClick={() => handleDelete(policy.id)}> Delete</button>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default AllPolicies;
