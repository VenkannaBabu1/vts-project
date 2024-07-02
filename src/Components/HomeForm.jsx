import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomeForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import UserNav from './UserNav';


const HomeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    policyName: location.state.policyName,
    policyId: location.state.policyId,
    houseno:'',
    location: '',
    owner: '',
    documentimage: null
  });

  const token = localStorage.getItem("token");
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

  const baseurl = `${import.meta.env.VITE_URL}/homeinsurance`;

  const registerAPICall = (registerObj) => {
    const formData = new FormData();
    formData.append('policyId', registerObj.policyId);
    formData.append('policyName', registerObj.policyName);
    formData.append('houseno', registerObj.houseno);
    formData.append('location', registerObj.location);
    formData.append('owner', registerObj.owner);
    formData.append('documentimage', registerObj.documentimage);

    return axios.post(baseurl + '/apply', formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAPICall(data)
      .then((responseData) => {
      toast.success('Form submitted successfully! Please wait. Redirecting to Payment page',{position:"top-center"});
      setTimeout(() => {
          navigate("/payment", { state: { policyId:data.policyId, policyNo:responseData.data.policyNo, policyName: responseData.data.policyName  } });
        }, 5000); 
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen">
    <UserNav />

    <div className='main-contain-home'>
      <div className="container-Home-policy">
        <form id="contactus" onSubmit={handleSubmit}>
          <h3>HOME INSURANCE FORM</h3>
          <fieldset>
            <input
              
              type="text"
              name="PolicyName"
              value={data.policyName}
              onChange={handleChange}
              required
              disabled
              autoFocus
              
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="PolicyId"
              type="text"
              name="policyId"
              value={data.policyId}
              onChange={handleChange}
              disabled
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="houseno"
              type="text"
              name="houseno"
              value={data.houseno}
              onChange={handleChange}
              required
              minLength="2"
              title="Please enter a valid HouseNo ."
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="location"
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              required
              minLength="2"
              title="Please enter a valid Location ."
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Owner Name"
              type="text"
              name="owner"
              value={data.owner}
              onChange={handleChange}
              required
              minLength="2"
              title="Please enter a valid Owner with at least 2 characters."
            />
          </fieldset>
          <fieldset>
            <label htmlFor='housepapers' style={{ fontSize: "15px" }}>Upload House Papers</label>
            <input
              type="file"
              name="documentimage"
              onChange={handleFileChange}
              required
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              title="Please upload a valid document (PDF, DOC, DOCX, JPG, JPEG, PNG)."
            />
          </fieldset>
          <fieldset>
            <button type="submit" id="contactus-submit" data-submit="...Sending">
              Submit
            </button>
          </fieldset>
        </form>
        <ToastContainer />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default HomeForm;