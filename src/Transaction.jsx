import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Rejected.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AcceptPolicyAgent = () => {
  const [data, setData] = useState([]);
  const [policyData, setPolicyData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [policyNo, setPolicyNo] = useState(location.state.policyNo);
  const [type, setType] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const determineType = () => {
      switch (location.state.type) {
        case "TRAVEL":
          return "travelinsurance";
        case "VEHICLE":
          return "vehicleinsurance";
        case "HOME":
          return "homeinsurance";
        case "LIFE":
          return "lifeinsurance";
        case "HEALTH":
          return "healthinsurance";
        default:
          return "";
      }
    };
    setType(determineType());
  }, [location.state.type]);

  useEffect(() => {
    if (type) {
      fetchUsers();
      fetchPolicyData();
    }
  }, [policyNo, type]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/payment/get-specific-payments/${policyNo}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  const fetchPolicyData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/${type}/get-policy-by-policyNo/${policyNo}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setPolicyData(response.data);
    } catch (error) {
      console.error('Error fetching Policy:', error);
    }
  };

  const handleApproval = (status) => {
    const formData = new FormData();
    formData.append("status", status);
    axios.put(`${import.meta.env.VITE_URL}/${type}/approve/${policyNo}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then(res => {
        console.log(res.data);
        toast.success("Status is updated successfully", { position: "top-center" });
        setTimeout(() => {
          navigate('/agent-dashboard');
        }, 5000);
      }).catch(err => console.error(err));
  };

  return (
    <div className=''>
      <h1 className='text-center'>POLICY TRANSACTIONS APPROVAL</h1>
      <div className="container shadow-sm mt-3">
        <table className='table table-striped text-center'>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Policy Name</th>
              <th>Policy Id</th>
              <th>Policy No</th>
              <th>Transaction Id</th>
              <th>Reference Id</th>
              <th>Image Proof</th>
              <th>Status Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id} style={{ verticalAlign: "middle" }}>
                <td>{user.email}</td>
                <td>{user.policyName}</td>
                <td>{user.policyId}</td>
                <td>{user.policyNo}</td>
                <td>{user.transactionId}</td>
                <td>{user.referenceId}</td>
                <td>
                  <img
                    src={`data:image/png;base64,${user.imageProof}`}
                    alt="proof"
                    className="rounded-circle"
                    style={{ height: "100px" }}
                  />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {policyData.status === 'PENDING' && (
                    <div>
                      <button className='btn btn-primary' onClick={() => handleApproval("APPROVED")}>Accept</button>&nbsp;
                      <button className='btn btn-danger' onClick={() => handleApproval("REJECTED")}>Reject</button>
                    </div>
                  )}
                  {policyData.status === 'APPROVED' && (
                    <div>{policyData.status}</div>
                  )}
                  {policyData.status === 'REJECTED' && (
                    <div>{policyData.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AcceptPolicyAgent;
