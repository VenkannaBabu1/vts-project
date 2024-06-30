import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LifeAccept() {
    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/lifeinsurance/get-all-applications`,
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



    return (
        <div className='container mt-4 shadow'>
        <h2 className="text-center mb-4">APPLIED LIFE POLICIES</h2>
       
            
            <table className="table table-striped text-center">
                <thead>
                    <tr className='text-center'>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Policy Id</th>
                        <th>Policy No</th>
                        <th>Policy Name</th>
                        <th>nomineeName</th>
                        <th>nomineeAge</th>
                        <th>nomineeRelation</th>
                        <th>nomineeAadharnumbe</th>
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
                            <td style={{verticalAlign:"middle"}}>{req.nomineeName}</td>
                            <td style={{verticalAlign:"middle"}}>{req.nomineeAge}</td>
                            <td style={{verticalAlign:"middle"}}>{req.nomineeRelation}</td>
                            <td style={{verticalAlign:"middle"}}>{req.nomineeAadharnumber}</td>
                            <td style={{verticalAlign:"middle"}}>
                                      <button className='btn btn-success' onClick={() => navigate("/transaction",{state:{policyNo:req.policyNo, type:"LIFE"}})}>View Transactions</button>
                                      </td>

                                   
                                      </tr>
                                                              
                       
                    )):(
                      <tr><td colSpan={9}>NO Data Found</td></tr>
                    )
                  )}
                </tbody>
            </table>
        </div>
    );
}

export default LifeAccept;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment';

// const LifeApplications = () => {
//     const [lifeApplications, setlifeApplications] = useState([]);
//     const base_url = "${import.meta.env.VITE_URL}/lifeinsurance";
//     useEffect(() => {
//         const fetchlifeApplications = async () => {
//             try {
//                 const response = await axios.get(`${base_url}/get-all-applications`);
//                 setlifeApplications(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchlifeApplications();
//     }, []);

//     const handleApprove = async (id) => {
//         // const startDate = moment().format('YYYY-MM-DD');
//         // const endDate = moment().add(2, 'years').format('YYYY-MM-DD');

//         try {
//             await axios.put(`${base_url}/approve/${id}`, {
//                 startDate,
//                 endDate,
//                 status: 'Approved'
//             });

//             const updatedlifeApplications = lifeApplications.map(lifeApp => {
//                 if (lifeApp.id === id) {
//                     return { ...lifeApp, status: 'Approved', startDate, endDate };
//                 }
//                 return lifeApp;
//             });
//             setlifeApplications(updatedlifeApplications);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             await axios.put(`${base_url}/lifeApplications/${id}`, {
//                 status: 'rejected'
//             });

//             const updatedlifeApplications = lifeApplications.map(lifeApp => {
//                 if (lifeApp.id === id) {
//                     return { ...lifeApp, status: 'rejected' };
//                 }
//                 return lifeApp;
//             });
//             setlifeApplications(updatedlifeApplications);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className='container'>
//             <h2 className="text-center">Life Applications</h2>
//             <div className="row">
//                 <table className="table table-striped table-bordered text-center">
//                     <thead>
//                         <tr className='text-primary'>
//                             <th>id</th>
//                             <th>email</th>
//                             <th>policyNo</th>
//                             <th>PolicyName</th>
//                             <th>policyId</th>
//                             <th>nomineeName</th>
//                             <th>nomineeAge</th>
//                             <th>nomineeRelation</th>
//                             <th>nomineeAadharnumber</th>
//                             {/* <th>startDate</th>
//                             <th>endDate</th> */}
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {lifeApplications.map((lifeApp, index) => (
//                             <tr key={lifeApp.id}>
//                                 <td>{index + 1}</td>
//                                 <td>{lifeApp.email}</td>
//                                 <td>{lifeApp.policyNo}</td>
//                                 <td>{lifeApp.PolicyName}</td>
//                                 <td>{lifeApp.policyId}</td>
//                                 <td>{lifeApp.nomineeName}</td>
//                                 <td>{lifeApp.nomineeAge}</td>
//                                 <td>{lifeApp.nomineeRelation}</td>
//                                 <td>{lifeApp.nomineeAadharnumber}</td>
//                                 {/* <td>{lifeApp.startDate}</td>
//                                 <td>{lifeApp.endDate}</td> */}
//                                 <td>{lifeApp.status}</td>
//                                 <td>
//                                     {lifeApp.status !== 'APPROVED' && (
//                                         <button
//                                             style={{ marginLeft: "10px" }}
//                                             className="btn btn-success"
//                                             onClick={() => handleApprove(lifeApp.policyNo)}
//                                         >
//                                             lifeApprove
//                                         </button>
//                                     )}
//                                     {lifeApp.status !== 'REJECTED' && (
//                                         <button
//                                             style={{ marginLeft: "10px" }}
//                                             className="btn btn-danger"
//                                             onClick={() => handleReject(lifeApp.policyNo)}
//                                         >
//                                             Reject
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default LifeApplications;