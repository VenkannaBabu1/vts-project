import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className='container mt-4 shadow'>
            <h2 className="text-center mb-4">Vehicle Policy Transaction Applications</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="table table-striped text-center">
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
                        {requests && requests.map((req, index) =>
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
                                    <img src={`data:image/png;base64,${req.documentimage}`} alt="Claim" className="rounded-circle" />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <button className='btn btn-success' onClick={() => navigate("/transaction", { state: { policyNo: req.policyNo, type:"VEHICLE" } })}>View Transactions</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default VehicleAccept;
