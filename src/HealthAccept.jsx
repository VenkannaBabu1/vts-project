import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/SurveyorNav';
import './approval.css';

function HealthAccept() {
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/healthinsurance/get-all-applications`,
                {
                    headers: {
            
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                    }
                }
            );
            if(response.data)
                {
                    setLoading(false)
                }
            setRequests(response.data);
        } catch (error) {
            console.log("fetching data error", error);
        }
    }



    return ( <div className="min-h-screen bg-gray-100">
            <UserNav />
    <div className='approval'>
        <div className='container mt-0 shadow'>
        <h1 className="text-center h1 mb-4 text-black">APPLIED HEALTH POLICIES</h1>
       
            <div className='overflow-x-auto'>
            <table className="table table-striped text-center mb-2">
                <thead>
                    <tr className='text-center'>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Policy Id</th>
                        <th>Policy No</th>
                        <th>Policy Name</th>
                        <th>Existing Medical Condition</th>
                        <th>Current_Medication</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9}>loading Data.....</td></tr>
                  ):( 
                    requests.length >0 ?(
                    requests.map((req, index) =>
                        <tr key={req.id}  >
                            <td style={{verticalAlign:"middle"}}>{index + 1}</td>
                            <td style={{verticalAlign:"middle"}}>{req.email}</td>
                            <td style={{verticalAlign:"middle"}}>{req.policyId}</td>
                            <td style={{verticalAlign:"middle"}}>{req.policyNo}</td>
                            <td  style={{verticalAlign:"middle"}}>{req.policyName}</td>
                            <td style={{verticalAlign:"middle"}}>{req.existing_medical_condition}</td>
                            <td style={{verticalAlign:"middle"}}>{req.current_medication}</td>
                            <td style={{verticalAlign:"middle"}}>
                                <img src={req.documentimage} alt="Claim" className="rounded-circle" />
                            </td>
                            <td style={{verticalAlign:"middle"}}>
                                      <button className='btn btn-success' onClick={() => navigate("/transaction",{state:{policyNo:req.policyNo, type:"HEALTH"}})}>View Transactions</button>
                                      </td>

                                   
                                      </tr>
                                                              
                       
                    )):(
                      <tr><td colSpan={9}>NO Data Found</td></tr>
                    )
                  )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
        <Footer/>
        </div>
    );
}

export default HealthAccept;