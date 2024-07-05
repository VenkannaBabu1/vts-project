import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import UserNav from '../AdminNav';
import './HealthPolicyView.css';

function TravelPolicyView() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/travelinsurance/get-all-applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
            if (response.data) {
                setRequests(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log("Fetching data error", error);
            setLoading(false);
        }
    }

    return (<div className="min-h-screen bg-gray-100">
            <UserNav />
        <div className='HealthPolicyView'>
            <div className='container mt-0'>
                <h1 className="text-center mb-1 h1 text-black" >VIEW ALL TRAVEL POLICIES</h1>
                <div className="row">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>User Email</th>
                                <th>Policy Id</th>
                                <th>Policy Number</th>
                                <th>Policy Name</th>
                                <th>Destination</th>
                                <th>Mode of Travel</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8">Data is being fetched...</td>
                                </tr>
                            ) : (
                                requests.length > 0 ? (
                                    requests.map((req, index) =>
                                        <tr key={req.id}>
                                            <td>{index + 1}</td>
                                            <td>{req.email}</td>
                                            <td>{req.policyId}</td>
                                            <td>{req.policyNo}</td>
                                            <td>{req.destination}</td> {/* //policyName will be displayed here but variable is destination */}
                                            <td>{req.policyName}</td>{/* //destination will be displayed here but variable is policyname */}
                                            <td>{req.modeOfTravel}</td>
                                            <td>{req.status}</td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="8">No data available</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer/></div>
    );
}

export default TravelPolicyView;
