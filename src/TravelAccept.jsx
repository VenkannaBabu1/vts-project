import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer";
import UserNav from './Components/SurveyorNav';
import './approval.css';

function TravelAccept() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/travelinsurance/get-all-applications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setRequests(response.data);
            setLoading(false); // Data fetched, set loading to false
            console.log(response.data);
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
            <h1 className="text-center h1 mb-1 text-black"> Appliedd Travel Policies</h1>
           <div className='overflow-x-auto'>
                
                <table className="table table-striped text-center">
                    <thead>
                        <tr className='text-center'>
                            <th>S.No</th>
                            <th>Email</th>
                            <th>Policy Id</th>
                            <th>Policy No</th>
                            <th>Policy Name</th>
                            <th>modeOfTravel</th>
                            <th>ticketId</th>
                            <th>nomineeName</th>
                            <th>nomineeRelation</th>
                            <th>nomineeAge</th>
                            <th>nomineeAadharNo</th>
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
                            <tr key={req.id} >
                                <td style={{verticalAlign:"middle"}}>{index + 1}</td>
                                <td style={{verticalAlign:"middle"}}>{req.email}</td>
                                <td style={{verticalAlign:"middle"}}>{req.policyId}</td>
                                <td style={{verticalAlign:"middle"}}>{req.policyNo}</td>
                                <td  style={{verticalAlign:"middle"}}>{req.policyName}</td>
                                <td  style={{verticalAlign:"middle"}}>{req.modeOfTravel}</td>
                                <td  style={{verticalAlign:"middle"}}>{req.ticketId}</td>
                                <td  style={{verticalAlign:"middle"}}>{req.nomineeName}</td>
                                
                                <td style={{verticalAlign:"middle"}}>{req.nomineeRelation}</td>
                                <td style={{verticalAlign:"middle"}}>{req.nomineeAge}</td>
                                <td style={{verticalAlign:"middle"}}>{req.nomineeAadharNo}</td>
                               <td style={{verticalAlign:"middle"}}>
                                    <img src={`data:image/png;base64,${req.documentimage}`} alt="Claim" className="rounded" />
                                </td>
                                <td style={{verticalAlign:"middle"}}>
                                          <button className='btn btn-success' onClick={() => navigate("/transaction",{state:{policyNo:req.policyNo, type:"TRAVEL"}})}>View Transactions</button>
                                          </td>

                                       
                                          </tr>
                                                                  
                           
                                        )):(
                                            <tr><td colSpan={13}>NO Data Found</td></tr>
                                          )
                                        )}</tbody>
                </table>
                </div>
                </div>
                </div>
                <Footer/>
                </div>

        
    );
}

export default TravelAccept;