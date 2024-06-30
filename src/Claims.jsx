import axios from 'axios';
import './Claims.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';

const Claims = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    Email: '',
    policyName: location.state.policyName,
    policyId: location.state.policyId,
    policyNo: location.state.policyNo,
    description: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const baseurl = `${import.meta.env.VITE_URL}/claim`;
  const registerAPICall = (registerObj) => {
    const data = new FormData();
    data.append('policyName', registerObj.policyName);
    data.append('policyId', registerObj.policyId);
    data.append('policyNo', registerObj.policyNo);
    data.append('description', registerObj.description);
    data.append('file', registerObj.image);
    
    const token = localStorage.getItem('token');
    return axios.post(baseurl + '/add-claim', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const register = (e) => {
    e.preventDefault();
    registerAPICall(formData)
      .then((response) => {
        toast.success(response.data, { position: "top-center" });
        setTimeout(() => {
          navigate("/user-dashboard");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to request claim', { position: "top-center" });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

      <div className="claim-main-container">
        <div className="claim-container">
          <form id="claim" onSubmit={register}>
            <h3>REQUEST FOR CLAIM</h3>

            <fieldset>
              <input type="text" name="policyName" placeholder='Policy Name' value={formData.policyName} onChange={handleChange} required />
            </fieldset>

            <fieldset>
              <input type="text" name="policyId" placeholder='Policy Id' value={formData.policyId} onChange={handleChange} required />
            </fieldset>

            <fieldset>
              <input type="text" name="policyNo" placeholder='Policy No' value={formData.policyNo} onChange={handleChange} required />
            </fieldset>

            <fieldset>
              <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} required />
            </fieldset>

            <fieldset>
              <label htmlFor="image">Upload Proof:</label>
              <input type="file" name="image" onChange={handleFileChange} required />
            </fieldset>

            <fieldset>
              <button type="submit">Request Claim</button>
            </fieldset>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default Claims;
