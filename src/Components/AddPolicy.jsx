import React, { createContext, useContext, useState } from 'react';
import './AddPolicy.css';
import axios from 'axios';
import Footer from "./Footer";
import UserNav from './AdminNav';
import { useNavigate } from 'react-router-dom';



const AddPolicy = () => {
  const [formData, setFormData] = useState({
    type: '',
    policyName: '',
    coverage: '',
    premium: '',
    description: ''
  });
  const token = localStorage.getItem("token");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    await axios.post(`${import.meta.env.VITE_URL}/policy/add-policy`, formData,
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
      type: '',
      policyName: '',
      coverage: '',
      premium: '',
      description: ''
    });
      
    alert('policy added successfully! ,Please check the policies');
    navigate('/view-all-policies');
    
  } catch (error) {
    console.error('Error adding data:', error);
    // toast.error('regsiter failed. Please try again.', {
    
    // });

  }
  };

  return (
    <div className="min-h-screen bg-gray-100" >
            <UserNav />
            <div className='add-policy'>
    <div className='AdminDashboardForm mt-10'>
      <h1 className="text-center mb-4 h1 text-black px-2 ml-2">Policy Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="VEHICLE">VEHICLE</option>
            <option value="HEALTH">HEALTH</option>
            <option value="TRAVEL">TRAVEL</option>
            <option value="LIFE">LIFE</option>
            <option value="HOME">HOME</option>
          </select>
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
        <button className='admin-dashboard-form button' type="submit">Submit</button>
      </form>
    </div>
    </div>
    <Footer />
        </div>
  );
};

export default AddPolicy;