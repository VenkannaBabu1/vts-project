import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/UserNav';
import './UserPayment.css';

function UserPayments() {
    const [requests, setRequests] = useState([]);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/payment/get-my-payments`,
                { 
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            setLoading(false);
        }
    }



    return (
        <div className="min-h-screen bg-gray-100">
        <UserNav />
  


        <div className='payment'>
        <h1 className="text-center mb-4 h1 text-fuchsia-50">ALL TRANSACTIONS</h1>
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
                            <th>Transaction Date</th>
                            <th>Image Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={9}>loading Data.....</td></tr>
                      ):( 
                        requests.length >0 ?(
                        requests.map((req, index) =>
                            <tr key={req.id}>
                                <td style={{verticalAlign:"middle"}}>{index + 1}</td>
                                <td style={{verticalAlign:"middle"}}>{req.email}</td>
                                <td style={{verticalAlign:"middle"}}>{req.policyId}</td>
                                <td style={{verticalAlign:"middle"}}>{req.policyNo}</td>
                                <td  style={{verticalAlign:"middle"}}>{req.policyName}</td>
                                <td style={{verticalAlign:"middle"}}>{req.amount}</td>
                                <td style={{verticalAlign:"middle"}}>{req.referenceId}</td>
                                <td style={{verticalAlign:"middle"}}>{req.transactionId}</td>
                                <td style={{verticalAlign:"middle"}}>{req.date}</td>
                                <td style={{verticalAlign:"middle"}}>
                                    <img src={`data:image/png;base64,${req.imageProof}`} alt="Claim" className="rounded-circle" style={{height:"100px"}}/>
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
            <Footer />
            </div>
        
    );
}

export default UserPayments;