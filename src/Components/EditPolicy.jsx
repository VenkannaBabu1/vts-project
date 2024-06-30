import React, { createContext, useContext, useState } from 'react';
import './AddPolicy.css';
import axios from 'axios';
import Footer from "./Footer";
import UserNav from './AdminNav';
import { useLocation } from 'react-router-dom';



const EditPolicy = () => {
    const location = useLocation();
  const [formData, setFormData] = useState({
    id: location.state.id,
    type: location.state.type,
    policyName: location.state.policyName,
    coverage: location.state.coverage,
    premium: location.state.premium,
    description: location.state.description
  });
  const token = localStorage.getItem("token");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    await axios.put(`${import.meta.env.VITE_URL}/policy/update-policy`, formData,
      {headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
  }
     );
     console.log(formData);
    console.log('Policy added successfully:', formData);
    // toast("Policy Added successful");
   
    console.log(formData);
    
   
    
    setFormData({
        id:"",
      type: '',
      policyName: '',
      coverage: '',
      premium: '',
      description: ''
    });
     
    
  } catch (error) {
    console.error('Error adding data:', error);
    // toast.error('regsiter failed. Please try again.', {
    
    // });

  }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
            <UserNav />
    <div className='AdminDashboardForm'>
      <h2>Premium Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="title"
            name="policyName"
            value={formData.type}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="title">PolicyName:</label>
          <input
            type="text"
            id="title"
            name="policyName"
            value={formData.policyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="coverage">Coverage: ₹</label>
          <input
            type="number"
            id="coverage"
            name="coverage"
            value={formData.coverage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="premium">Premium: ₹</label>
          <input
            type="number"
            id="premium"
            name="premium"
            value={formData.premium}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='admin-dashboard-form button' type="submit">Update</button>
      </form>
    </div>
    <Footer />
        </div>
  );
};

export default EditPolicy;