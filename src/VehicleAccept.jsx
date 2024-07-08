import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/SurveyorNav';
import './approval.css';

function VehicleAccept() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/vehicleinsurance/get-all-applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setRequests(response.data);
            setLoading(false); // Data fetched, set loading to false
        } catch (error) {
            console.log("fetching data error", error);
            setLoading(false); // Set loading to false on error
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNav />
    <div className='approval'>
        <div className='container mt-0 shadow'>
            <h1 className="text-center h1 mb-1 text-black">Vehicle Policy  Applications</h1>

           
                <table className="table table-striped text-center mb-2">
                    <thead>
                        <tr className='text-center'>
                            <th>S.No</th>
                            <th>Email</th>
                            <th>Policy Id</th>
                            <th>Policy No</th>
                            <th>Policy Name</th>
                            <th>VehicleNo</th>
                            <th>VehicleCompany</th>
                            <th>VehicleModel</th>
                            <th>ChassisNo</th>
                            <th>Manufacturing Year</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={12}  className='text-center'>Loading Data.......</td>
                        </tr>
            ) : ( requests.length>0?(
                        requests && requests.map((req, index) =>
                            <tr key={req.id}>
                                <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.email}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.policyId}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.policyNo}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.policyName}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.vehicleNumber}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.vehicleCompany}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.vehicleModel}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.chassisNumber}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.manufacturingYear}</td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <img src={`data:image/png;base64,${req.documentimage}`} alt="Claim" className="rounded" />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <button className='btn btn-success' onClick={() => navigate("/transaction", { state: { policyNo: req.policyNo, type:"VEHICLE" } })}>View Transactions</button>
                                </td>
                            </tr>
                        )):(
                            <tr>
                                <td colSpan={12}>NO Data Found</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            
        </div>
        </div>
        <Footer/>
        </div>
    );
}

export default VehicleAccept;
