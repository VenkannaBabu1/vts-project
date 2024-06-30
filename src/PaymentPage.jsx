import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import pic from './paytm-qrcode.jpg';
import './Payment.css';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    console.log("Policy ID:", location.state.policyId);
    console.log("Policy No:", location.state.policyNo);

    const [transactionId, setTransactionId] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [imageProof, setImageProof] = useState(null);
    const [amount, setAmount] = useState('');
    const [policyId, setPolicyId] = useState(location.state.policyId);
    const [policyNo, setPolicyNo] = useState(location.state.policyNo);
    const [policyName, setPolicyName] = useState(location.state.policyName);

    const handleImageProofChange = (e) => {
        setImageProof(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('transactionId', transactionId);
        formData.append('referenceId', referenceId);
        formData.append('policyName', policyName);
        formData.append('file', imageProof);
        formData.append('amount', amount);
        formData.append('policyId', policyId);
        formData.append('policyNo', policyNo);
        try {
            const token = localStorage.getItem('token');  // Get the token from localStorage
            const response = await axios.post(`${import.meta.env.VITE_URL}/payment/save-payment`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Payment is Successful! wait for the Approval ',{position:"top-center"});
      setTimeout(() => {
          navigate("/user-dashboard");
        }, 5000);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
      <UserNav />
      <div className="health-contain">
        <div className="payment-container">
            <div className="image">
                <h1>Payment Page</h1>
                <img src={pic} alt="Paytm QR Code" />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Policy Id:</label>
                    <input
                        type="text"
                        value={policyId}
                        onChange={(e) => setPolicyId(e.target.value)}
                        required
                        disabled
                    />
                </div>
                <div>
                    <label>Policy Number:</label>
                    <input
                        type="text"
                        value={policyNo}
                        onChange={(e) => setPolicyNo(e.target.value)}
                        required
                        disabled
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Transaction ID:</label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Reference ID:</label>
                    <input
                        type="text"
                        value={referenceId}
                        onChange={(e) => setReferenceId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image Proof:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageProofChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        <Footer />
        </div>
    );
};

export default PaymentPage;
