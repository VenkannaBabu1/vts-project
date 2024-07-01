import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row bg-[#1869b0] text-white justify-around p-4 text-[20px] items-center'>
      <div className="navbar flex flex-row items-center space-x-5">
        <img src="https://orientalinsurance.org.in/static/media/oicl-logo.929a7ab1475dedd01b32.png" alt="" width={50} />
        <h1>Company</h1>
      </div>
      <div className='nav-items'>
        <ul className='flex flex-row space-x-20'>
          <li><button onClick={() => navigate("/add-policy")}>Add Policies</button></li>
          <li><button onClick={() => navigate("/view-all-policies")}>All Policies</button></li>
          <li><button onClick={() => navigate("/ClaimAcceptReject")}>All Claims</button></li>
        </ul>
      </div>
      <div className="btn">
        <button
          className='hover:bg-white hover:text-blue-500 p-2 rounded-md'
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
