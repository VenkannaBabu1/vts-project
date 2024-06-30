import React, { useEffect, useState } from 'react';
import axios from 'axios';
function AdminViewAllClaims() {
    const [requests,setRequests] = useState([]);
    useEffect(()=>{
    
        try{
            axios.get( `${import.meta.env.VITE_URL}/claim/getClaims`).then((response)=>{
                setRequests(response.data);
                
                console.log(response.data);
            });
            
        }catch(error)
        {
            console.log(error);
        }
    },[]);
    return (
        <div >
             
        <div className='container mt-4'>
           
        <h2 className="text-center mb-4">VIEW ALL CLAIMS</h2>
        
       
    
     <div className = "row" >
            <table className= "table table-striped table-bordered text-center ">
                <thead >
                    <tr >
                        <th>S.No</th>
                        <th>EMAIL</th>
                        <th>Policy Id</th>
                        <th> Policy Name</th>
                        <th> Policy No</th>
                        <th> Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests && requests.map(
                            (req,index) => 
                         
                            <tr key = {req.id}>
                                <td>{index+1}</td>
                                  <td>{req.email}</td>  
                                <td> { req.policyId} </td> 
                                 <td> { req.policyName} </td>   
                                 <td> {req.policyNo}</td>
                                 <td> {req.description}</td>
                                 <td>
                <img src={`data:image/png;base64,${req.image}`} alt="Claim" className="Claim-image" />
              </td>
                                 <td>{req.status}</td>
                            </tr>
                         
                        )
                    }
                </tbody>
            </table>
    </div>

                
    </div>
            
    </div>

        
   
    );
}

export default AdminViewAllClaims;