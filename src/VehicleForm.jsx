import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VehicleForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';


function VehicleForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    policyId: location.state.policyId,
    policyName: location.state.policyName,
    vehicleNumber: '',
    vehicleCompany: '',
    vehicleModel: '',
    chassisNumber: '',
    manufacturingYear: '',
    documentimage: null,
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

  const baseurl = `${import.meta.env.VITE_URL}/vehicleinsurance`;

  const registerAPICall = (registerObj) => {
    const formData = new FormData();
    Object.keys(registerObj).forEach((key) => {
      formData.append(key, registerObj[key]);
    });

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
        toast.success('Form submitted successfully! Please wait. Redirecting to Payment page', { position: "top-center" });
        setTimeout(() => {
          navigate('/payment', { state: { policyId: response.data.policyId, policyNo: response.data.policyNo , policyName: response.data.policyName } });
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
      <div className='vehicle'>
    <div className="travel-main-container-vehicle">
      <div className="travel-row">
        <div className="travel-card mx-auto">
          <div className="travel-card-body ">
            <div className="travel-container">
              <form id="contact-form" role="form" onSubmit={handleSubmit}>
                <div className="travel-text-center">
                  <h1>VEHICLE INSURANCE FORM</h1>
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
                          disabled
                          required
                        />
                      </div>
                    </div>
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="policyId">Policy Id</label>
                        <input
                          id="policyId"
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
                        <label htmlFor="vehicleNumber">Vehicle Number</label>
                        <input
                          id="vehicleNumber"
                          type="text"
                          name="vehicleNumber"
                          className="travel-form-control"
                          onChange={handleChange}
                          required
                          minLength="2"
                          title="Please enter a valid vehicle number."
                        />
                      </div>
                    </div>
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="vehicleCompany">Vehicle Company</label>
                        <input
                          id="vehicleCompany"
                          type="text"
                          name="vehicleCompany"
                          className="travel-form-control"
                          onChange={handleChange}
                          required
                          minLength="2"
                          title="Please enter a valid vehicle company."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="travel-row mb-3">
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="vehicleModel">Vehicle Model</label>
                        <input
                          id="vehicleModel"
                          type="text"
                          name="vehicleModel"
                          className="travel-form-control"
                          onChange={handleChange}
                          required
                          minLength="2"
                          title="Please enter a valid vehicle model."
                        />
                      </div>
                    </div>
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="chassisNumber">Chassis Number</label>
                        <input
                          id="chassisNumber"
                          type="text"
                          name="chassisNumber"
                          className="travel-form-control"
                          onChange={handleChange}
                          required
                          minLength="2"
                          title="Please enter a valid chassis number."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="travel-row mb-3">
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="manufacturingYear">Manufacturing Year</label>
                        <input
                          id="manufacturingYear"
                          type="number"
                          name="manufacturingYear"
                          className="travel-form-control"
                          onChange={handleChange}
                          required
                          minLength="4"
                          title="Please enter a valid manufacturing year."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="travel-row mb-3">
                    <div className="travel-col-md-6">
                      <div className="travel-form-group">
                        <label htmlFor="documentimage">Upload Document</label>
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
      <ToastContainer />
    </div>
    </div>
    <Footer />
    </div>
  );
}

export default VehicleForm;
