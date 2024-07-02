import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';
import './HealthForm.css'; 

const HealthForm = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [data, setData] = useState({
    existing_medical_condition: '',
    current_medication: '',
    documentimage: null,
    policyName: location.state.policyName,
    policyId: location.state.policyId, 
  });

  const [policyNo, setPolicyNo] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setData({
      ...data,
      [name]: files[0],
    });
  };

  const baseurl = `${import.meta.env.VITE_URL}/healthinsurance`;

  const registerAPICall = async (registerObj) => {
    try {
      const formData = new FormData();
      formData.append('existing_medical_condition', registerObj.existing_medical_condition);
      formData.append('current_medication', registerObj.current_medication);
      formData.append('documentimage', registerObj.documentimage);
      formData.append('policyId', registerObj.policyId);
      formData.append('policyName', registerObj.policyName);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseurl}/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const responseData = await registerAPICall(data);
      setPolicyNo(responseData.policyNo);
      toast.success('Form submitted successfully! Redirecting to Payment page...', { position: "top-center" });
      setTimeout(() => {
        navigate("/payment", { state: { policyId: data.policyId, policyName: data.policyName , policyNo: responseData.policyNo } });
      }, 4000);
    } catch (error) {
      toast.error('Failed to submit form. Please try again.', { position: "top-center" });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

      <div className="main-contain">
        <div className="container-health">
          <form id="contactus" role="form" onSubmit={handleSubmit}>
            <h3>HEALTH INSURANCE FORM</h3>
            <div className="form-group">
              <label htmlFor="form_name">Policy Name *</label>
              <input
                id="form_name"
                type="text"
                name="policyName"
                className="form-control"
                value={data.policyName}
                onChange={handleChange}
                placeholder=""
                required
                readOnly
              />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="policyId">Policy Id *</label>
                <input
                  id="policyId"
                  type="text"
                  name="policyId"
                  className="form-control"
                  value={data.policyId}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_message">Existing Medical Condition *</label>
                  <textarea
                    id="form_message"
                    name="existing_medical_condition"
                    className="form-control"
                    value={data.existing_medical_condition}
                    onChange={handleChange}
                    placeholder="Write your message here."
                    rows="4"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="form_message">Current Medication *</label>
                  <textarea
                    id="form_message"
                    name="current_medication"
                    className="form-control"
                    value={data.current_medication}
                    onChange={handleChange}
                    placeholder="Write your message here."
                    rows="4"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row m-1">
              <div className="col-md-12">
                <label htmlFor="exampleFormControlFile1">Upload Medical Reports</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="documentimage"
                  onChange={handleFileChange}
                  id="exampleFormControlFile1"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="submit">
                  <input type="submit" className='submit-health' value="Submit" disabled={isLoading} />
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default HealthForm;
