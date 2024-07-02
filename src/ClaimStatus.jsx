import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ClaimStatus.css';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';

const UserClaimStatus = () => {
  const [data, setData] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/claim/get-my-claims`, 
       { headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data); // Check the structure of the response
      setData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCardClick = (email) => {
    setExpandedCardId(expandedCardId === email ? null : email);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />
      <div className="users-list">
        <h1 className="text-center mb-4 h1 text-black">User Claim Status</h1>
        <div className="card-grid">
          {data.map((user) => (
            <div
              key={user.email}
              className="card"
              onClick={() => handleCardClick(user.email)}
            >
              <img className="card-img-top" src={user.image ? `data:image/png;base64,${user.image}` : 'placeholder-image.png'} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{user.policyName}</h5>
                <p className="card-text">Policy ID: {user.policyId}</p>
                <p className="card-text">Policy No: {user.policyNo}</p>
                <p className="card-text">Status: {user.status}</p>
                {expandedCardId === user.email && (
                  <div className="more-info">
                    <p>Email: {user.email}</p>
                  </div>
                )}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          ))}
        </div>
        {expandedCardId && (
          <div className="expanded-card-overlay">
            <div className="expanded-card-content">
              {data.map((user) => (
                user.email === expandedCardId && (
                  <div key={user.email} className="card expanded-card">
                    <img className="card-img-top" src={user.image ? `data:image/png;base64,${user.image}` : 'placeholder-image.png'} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{user.policyName}</h5>
                      <p className="card-text">Policy ID: {user.policyId}</p>
                      <p className="card-text">Policy No: {user.policyNo}</p>
                      <p className="card-text">Status: {user.status}</p>
                      <div className="more-info">
                        <p>Email: {user.email}</p>
                      </div>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      <button className='bt1' onClick={() => setExpandedCardId(null)}>Close</button>
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

export default UserClaimStatus;
