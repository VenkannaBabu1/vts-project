import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar/Navbar.css';

const SurveyorNav = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row bg-[#1869b0] text-white justify-around p-4 text-[20px] items-center'>
      <div className="navbar flex flex-row items-center space-x-5">
        <img src="https://orientalinsurance.org.in/static/media/oicl-logo.929a7ab1475dedd01b32.png" alt="" width={50} />
        <h1>Company</h1>
      </div>
      <div className='nav-items'>
        <ul className='flex flex-row space-x-20'>
          <li>
            <button onClick={() => navigate("/ClaimAcceptRejectAgent")}>All Claims</button>
          </li>
          <li className="relative">
            <button className='Login-btn text-white'>Policies</button>
            <ul className="drop-down absolute hidden bg-white text-black mt-2 p-2 rounded shadow-lg">
              <li>
                <button onClick={() => navigate("/health-applications")}>Health Policy Approval</button>
              </li>
              <li>
                <button onClick={() => navigate("/home-applications")}>Home Policy Approval</button>
              </li>
              <li>
                <button onClick={() => navigate("/life-applications")}>Life Policy Approval</button>
              </li>
              <li>
                <button onClick={() => navigate("/vehicle-applications")}>Vehicle Policy Approval</button>
              </li>
              <li>
                <button onClick={() => navigate("/travel-applications")}>Travel Policy Approval</button>
              </li>
            </ul>
          </li>
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
}

export default SurveyorNav;
