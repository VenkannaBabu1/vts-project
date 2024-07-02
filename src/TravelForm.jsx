import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TravelForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';


function TravelForm() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [data, setData] = useState({
    
    policyId: location.state.policyId,
    policyName:location.state.policyName,
    destination: '',
    organisation: '',
    startTime: '',
    endTime: '',
    modeOfTravel: '',
    ticketId: '',
    documentimage: null,
    nomineeName: '',
    nomineeRelation: '',
    nomineeAge: '',
    nomineeAadharNo: ''
  });

  
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


  const baseurl = `${import.meta.env.VITE_URL}/travelinsurance`;

  const registerAPICall = (registerObj) => {
    const formData = new FormData();
    Object.keys(registerObj).forEach((key) => {
      formData.append(key, registerObj[key]);
    });

    // toast("The policy is Requested. Wait for the approval!");
    const token = localStorage.getItem('token');
    return axios.post(baseurl + '/apply', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAPICall(data)
      .then((response) => {
        toast.success('Form submitted successfully! Please wait. Redirecting to Payment page',{position:"top-center"});
      setTimeout(() => {
        navigate('/payment', { state: { policyId: response.data.policyId, policyNo: response.data.policyNo, policyName: response.data.policyName } });
        }, 5000); 
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      });
  };

  
    return (
      <div className="min-h-screen bg-gray-100">
      <UserNav />
<div className='travel'>
      <div className="travel-main-container">
        <div className="travel-row">
          <div className="travel-card mx-auto">
            <div className="travel-card-body ">
              <div className="travel-container">
                <form id="contact-form" role="form" onSubmit={handleSubmit}>
                  <div className="travel-text-center">
                    <h1>TRAVEL INSURANCE FORM</h1>
                  </div>
                  <div className="travel-controls">
                    <div className="travel-row mb-3">
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="policyName">Policy Name</label>
                          <input
                            id="policyName"
                            type="text"
                            name="policyName"
                            className="travel-form-control"
                            value={data.policyName}
                            onChange={handleChange}
                            required
                            disabled
                          />
                        </div>
                      </div>
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="policyid">Policy Id</label>
                          <input
                            id="policyid"
                            type="text"
                            name="policyId"
                            className="travel-form-control"
                            value={data.policyId}
                            onChange={handleChange}
                            required
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="travel-row mb-3">
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="destination">Destination</label>
                          <input
                            id="destination"
                            type="text"
                            name="destination"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                            minLength="2"
                            title="Please enter a valid destination."
                          />
                        </div>
                      </div>
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="origin">Origin</label>
                          <input
                            id="origin"
                            type="text"
                            name="organisation"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                            minLength="2"
                            title="Please enter a valid origin."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="travel-row mb-3">
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="from">From</label>
                          <input
                            id="from"
                            type="date"
                            name="startTime"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="to">To</label>
                          <input
                            id="to"
                            type="date"
                            name="endTime"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="travel-row mb-3">
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="transport">Mode of Transport</label>
                          <input
                            id="transport"
                            type="text"
                            name="modeOfTravel"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                            minLength="2"
                            title="Please enter a valid mode of transport."
                          />
                        </div>
                      </div>
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="ticketId">Ticket Id</label>
                          <input
                            id="ticketId"
                            type="text"
                            name="ticketId"
                            className="travel-form-control"
                            onChange={handleChange}
                            required
                           
                          />
                        </div>
                      </div>
                    </div>
                    <div className="travel-row mb-3">
                      <div className="travel-col-md-6">
                        <div className="travel-form-group">
                          <label htmlFor="documentimage">Upload Ticket</label>
                          <input
                            type="file"
                            className="travel-form-control-file"
                            name="documentimage"
                            onChange={handleFileChange}
                            id="documentimage"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="travel-nominee-section">
                      <h2>Nominee Details</h2>
                      <div className="travel-row mb-3">
                        <div className="travel-col-md-6">
                          <div className="travel-form-group">
                            <label htmlFor="nomineeName">Name</label>
                            <input
                              id="nomineeName"
                              type="text"
                              name="nomineeName"
                              className="travel-form-control"
                              onChange={handleChange}
                              required
                              minLength="2"
                              title="Please enter a valid name."
                            />
                          </div>
                        </div>
                        <div className="travel-col-md-6">
                          <div className="travel-form-group">
                            <label htmlFor="relation">Relation with Applicant</label>
                            <input
                              id="relation"
                              type="text"
                              name="nomineeRelation"
                              className="travel-form-control"
                              onChange={handleChange}
                              required
                              minLength="2"
                              title="Please enter a valid relation."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="travel-row mb-3">
                        <div className="travel-col-md-6">
                          <div className="travel-form-group">
                            <label htmlFor="nomineeAge">Age</label>
                            <input
                              id="nomineeAge"
                              type="number"
                              name="nomineeAge"
                              className="travel-form-control"
                              onChange={handleChange}
                              required
                            
                            />
                          </div>
                        </div>
                        <div className="travel-col-md-6">
                          <div className="travel-form-group">
                            <label htmlFor="aadhaar">Aadhaar Number</label>
                            <input
                              id="aadhaar"
                              type="text"
                              name="nomineeAadharNo"
                              className="travel-form-control"
                              onChange={handleChange}
                              required
                           
                           
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="travel-row">
                      <div className="travel-col-md-12">
                        <input
                          type="submit"
                          className="travel-btn-send pt-2 btn-block"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
      </div>
    );
  
}

export default TravelForm;