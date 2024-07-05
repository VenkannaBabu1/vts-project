import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mypolicies.css';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';

const MyPolicieUser = () => {
  const [data, setData] = useState([]);
  
  const [expandedCardId, setExpandedCardId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_URL}/user/get-all-my-policies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data;
      const policyTypes = [
        'healthInsuranceDTO',
        'homeInsuranceDTO',
        'lifeInsuranceDTO',
        'travelInsuranceDTO',
        'vehicleInsuranceDto'
      ];

      const policies = policyTypes
        .filter(type => responseData[type])
        .map(type => responseData[type]);

      setData(policies);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCardClick = (policyNo) => {
    setExpandedCardId(expandedCardId === policyNo ? null : policyNo);
  };

  const handleClaim = (policyId, policyNo, policyName) => {
    console.log(`Claiming for policy with No: ${policyNo}`);
    navigate("/claims", { state: { policyId: policyId, policyNo: policyNo, policyName :policyName} });
    
  };

  return (
  
    <div className="min-h-screen bg-gray-100">
    <UserNav />

    <div className="users-list-policy">
      <h1 className="text-center mb-4 h1 text-black">My Policies</h1>
      <div className="card-grid">
        {data.map((policy) => (
          <div
            key={policy.policyNo}
            className={`card ${expandedCardId === policy.policyNo ? 'expanded' : ''}`}
            onClick={() => handleCardClick(policy.policyNo)}
          >
            <img className="card-img-top" src={`data:image/png;base64,${policy.documentimage}`} alt="Card cap" />
            <div className="card-body">
              <h5 className="card-title">{policy.policyName}</h5>
              <p className="card-text">Policy ID: {policy.policyId}</p>
              <p className="card-text">Policy Name: {policy.policyName}</p>
              {expandedCardId === policy.policyNo && (
                <div className="more-info">
                  <p>Email: {policy.email}</p>
                  <p>Policy No: {policy.policyNo}</p>
                  <p>Status: {policy.status}</p>
                  
                </div>
              )}
              <p className="card-text">
                <small className="text-muted">Last updated 1 min ago</small>
              </p>
            </div>
          </div>
        ))}
      </div>
      {expandedCardId && (
        <div className="expanded-card-overlay">
          <div className="expanded-card-content">
            {data.map((policy) => (
              policy.policyNo === expandedCardId && (
                <div key={policy.policyNo} className="card expanded-card">
                  <div className="card-body">
                    <h5 className="card-title">{policy.policyName}</h5>
                    <p className="card-text">Policy ID: {policy.policyId}</p>
                    <p className="card-text">Policy Name: {policy.policyName}</p>
                    <div className="more-info">
                      <p>Email: {policy.email}</p>
                      <p>Policy No: {policy.policyNo}</p>
                      <p>Status: {policy.status}</p>
                    </div>
                    <p className="card-text">
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </p>
                    <button className='bt1' onClick={() => setExpandedCardId(null)}>Close</button>
                    {policy.status === "APPROVED" && (
                    <button 
                      className="btnnn"
                      onClick={() => handleClaim(policy.policyId, policy.policyNo, policy.policyName)}
                    >
                      Claim
                    </button>
                  )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default MyPolicieUser;
