import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LifeForm.css'; // Make sure to create this CSS file as shown below
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';

const LifeForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        policyId: location.state.policyId,
        policyName: location.state.policyName,
        nomineeName: '',
        nomineeRelation: '',
        nomineeAge: '',
        nomineeAadharnumber: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_URL}/lifeinsurance/apply`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Form submitted successfully! Redirecting to Payment page...", { position: "top-center" });
            navigate('/payment', { state: { policyId: response.data.policyId, policyNo: response.data.policyNo , policyName: response.data.policyName } });
        } catch (error) {
            toast.error("An error occurred. Please try again.", { position: "top-center" });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNav />
            <div className='main-contain-life'>
                <div className="container-life">
                    <form id="contactus" onSubmit={handleSubmit}>
                        <h3>LIFE INSURANCE FORM</h3>
                        <fieldset>
                            <input
                                placeholder="Policy Name"
                                type="text"
                                name="policyName"
                                value={data.policyName}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="PolicyId"
                                type="text"
                                name="policyId"
                                value={data.policyId}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </fieldset>
                        <h4>Nominee Details</h4>
                        <fieldset>
                            <input
                                placeholder="Nominee Name"
                                type="text"
                                name="nomineeName"
                                value={data.nomineeName}
                                onChange={handleChange}
                                required
                                minLength="2"
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Relation With Applicant"
                                type="text"
                                name="nomineeRelation"
                                value={data.nomineeRelation}
                                onChange={handleChange}
                                required
                                minLength="2"
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Nominee Age"
                                type="number"
                                name="nomineeAge"
                                value={data.nomineeAge}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Nominee Aadhar Number"
                                type="number"
                                name="nomineeAadharnumber"
                                value={data.nomineeAadharnumber}
                                onChange={handleChange}
                                required
                                pattern="\d{12}"
                                title="Please enter a valid 12-digit Aadhar number."
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit" className='submit-life' disabled={isLoading}>
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

export default LifeForm;
