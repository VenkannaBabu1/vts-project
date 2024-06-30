import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimAcceptReject.css';
import Footer from "./Footer";
import UserNav from './SurveyorNav';

function ClaimAcceptReject() {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/claim/get-all-claims`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRequests(response.data);
        } catch (error) {
            console.log("fetching data error", error);
        }
    };

    const handleApproval = async (email) => {
        try {
            await axios.put(`${import.meta.env.VITE_URL}/claim/approve-claim/${email}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData(); // Refresh data after approval
        } catch (error) {
            console.log("accept functionality error", error);
        }
    };

    const handleCancel = async (email) => {
        try {
            await axios.put(`${import.meta.env.VITE_URL}/claim/cancel-claim/${email}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData(); // Refresh data after cancellation
        } catch (error) {
            console.log("reject functionality error", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNav />
            <div className='container-claim mt-4'>
                <h2 className="text-center mb-4">CLAIM REQUESTS</h2>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr className='text-center'>
                            <th>S.No</th>
                            <th>Email</th>
                            <th>Policy Id</th>
                            <th>Policy Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests && requests.map((req, index) => (
                            <tr key={req.id}>
                                <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.email}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.policyId}</td>
                                <td style={{ verticalAlign: "middle" }}>{req.policyName}</td>
                                <td style={{ verticalAlign: "middle" }}>
                                    <img src={`data:image/png;base64,${req.image}`} alt="Claim" className="rounded-circle image-rounded" />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                    {req.status === 'PENDING' && (
                                        <div>
                                            <button className="accept" onClick={() => handleApproval(req.email)}>Accept</button>
                                            <button className="reject" onClick={() => handleCancel(req.email)}>Reject</button>
                                        </div>
                                    )}
                                    {req.status === 'APPROVED' && (
                                        <div>{req.status}</div>
                                    )}
                                    {req.status === 'REJECTED' && (
                                        <div>{req.status}</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ClaimAcceptReject;
