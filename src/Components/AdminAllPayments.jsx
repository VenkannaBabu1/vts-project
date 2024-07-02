import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminAllPayments() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/payment/get-all-payments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            if (response.data) {
                setRequests(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log("fetching data error", error);
            setLoading(false);
        }
    }

    return (
        <div>
            <h2 className="text-center mb-4">ALL TRANSACTIONS</h2>
            <div className='container mt-4 shadow p-3 text-center'>
                <table className="table table-striped text-center pt-3">
                    <thead className='p-2'>
                        <tr className='text-center p-4'>
                            <th>S.No</th>
                            <th>Email</th>
                            <th>Policy Id</th>
                            <th>Policy No</th>
                            <th>Policy Name</th>
                            <th>Amount</th>
                            <th>Reference Id</th>
                            <th>Transaction Id</th>
                            <th>Image Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={9}>Loading Data.....</td></tr>
                        ) : (
                            requests.length > 0 ? (
                                requests.map((req, index) => {
                                    const imageUrl = req.imageProof || 'path_to_default_image'; // Fallback image URL
                                    console.log('Image URL:', imageUrl); // Log the image URL
                                    return (
                                        <tr key={req.id}>
                                            <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.email}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.policyId}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.policyNo}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.policyName}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.amount}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.referenceId}</td>
                                            <td style={{ verticalAlign: "middle" }}>{req.transactionId}</td>
                                            <td style={{ verticalAlign: "middle" }}>
                                                <img src={`data:image/png;base64,${req.imageProof}`} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan={9}>No Data Found</td></tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAllPayments;
