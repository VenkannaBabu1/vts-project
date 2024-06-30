import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "./Footer";
import SurveyorNav from './SurveyorNav';

function ViewAcceptedClaims() {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = new FormData();
            data.append('status', "APPROVED");
            const response = await axios.get(`${import.meta.env.VITE_URL}/claim/get-all-users-status`, {data}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Ensure the response data is an array
            if (Array.isArray(response.data)) {
                setRequests(response.data);
            } else {
                console.error('Unexpected response data format:', response.data);
            }
        } catch (error) {
            console.log("fetching data error", error);
        }
    };

    const handleApproval = async (email) => {
        try {
            await axios.get(`${import.meta.env.VITE_URL}/claim/get-all-users-status`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            fetchData();  // Refresh data after approval
        } catch (error) {
            console.log("accept functionality error", error);
        }
    };

    const handleCancel = async (email) => {
        try {
            await axios.put(`${import.meta.env.VITE_URL}/claim/cancel-claim/${email}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            fetchData();  // Refresh data after cancellation
        } catch (error) {
            console.log("reject functionality error", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
      <SurveyorNav />
        <div className='container mt-4' >
            <h2 className="text-center mb-4">CLAIM REQUESTS</h2>
            <table className="table table-striped table-bordered text-center">
                <thead>
                    <tr className='text-center'>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Policy Id</th>
                        <th>Policy Name</th>
                        <th>Policy No</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(requests) && requests.map((req, index) =>
                        <tr key={req.id}>
                            <td style={{verticalAlign: "middle"}}>{index + 1}</td>
                            <td style={{verticalAlign: "middle"}}>{req.email}</td>
                            <td style={{verticalAlign: "middle"}}>{req.policyId}</td>
                            <td style={{verticalAlign: "middle"}}>{req.policyName}</td>
                            <td style={{verticalAlign: "middle"}}>{req.policyNo}</td>
                            <td style={{verticalAlign: "middle"}}>{req.description}</td>
                            <td style={{verticalAlign: "middle"}}>
                                {req.status === 'PENDING' && (
                                    <div>
                                        <button onClick={() => handleApproval(req.email)}>Accept</button>
                                        <button onClick={() => handleCancel(req.email)}>Reject</button>
                                    </div>
                                )}
                                {req.status === 'APPROVED' && <div>{req.status}</div>}
                                {req.status === 'REJECTED' && <div>{req.status}</div>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Footer />
    </div>
    );
}

export default ViewAcceptedClaims;
