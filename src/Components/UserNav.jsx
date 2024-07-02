import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNav = () => {
  const navigate = useNavigate();
  
  return (
    <div className='flex flex-row bg-[#1869b0] text-white justify-around p-4 text-[20px] items-center'>
      <div className="navbar flex flex-row items-center space-x-5">
        <img src="https://media.licdn.com/dms/image/D4E0BAQHIdgdBRY-q9A/company-logo_200_200/0/1714975480286/vts_enterprises_india_private_limited_logo?e=2147483647&v=beta&t=0hXdwCVYy7a-iG76DUGYrO5faw5pSgHsA3WLlAclGkY" alt="" width={50} />
        <h1>VTS Insurance</h1>
      </div>
      <div className='nav-items'>
        <ul className='flex flex-row space-x-20'>
          <li>
            <Link to="/user-all-policies">All Policies</Link>
          </li>
          <li>
            <Link to="/my-policies">My Policies</Link>
          </li>
          <li>
            <Link to="/claimstatus">Claims</Link>
          </li>
          <li>
            <Link to="/user-payments">Payments</Link>
          </li>
          <li>
            <Link to="/user-profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="btn">
        <button 
          className='hover:bg-blue-500 p-2 rounded-md  text-white'
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

export default UserNav;
