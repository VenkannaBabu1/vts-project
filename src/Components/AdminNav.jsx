import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row bg-[#1869b0] text-white justify-around p-4 text-[20px] items-center'>
      <div className="navbar flex flex-row items-center space-x-5">
        <img src="https://media.licdn.com/dms/image/D4E0BAQHIdgdBRY-q9A/company-logo_200_200/0/1714975480286/vts_enterprises_india_private_limited_logo?e=2147483647&v=beta&t=0hXdwCVYy7a-iG76DUGYrO5faw5pSgHsA3WLlAclGkY" alt="" width={50} style={{borderRadius:'20px'}} />
        <h1>VTS Insurance</h1>
      </div>
      <div className='nav-items'>
        <ul className='flex flex-row space-x-20'>
          {/* <li><button onClick={() => navigate("/add-policy")}>Add Policies</button></li>
          <li><button onClick={() => navigate("/view-all-policies")}>All Policies</button></li>
          <li><button onClick={() => navigate("/ClaimAcceptReject")}>All Claims</button></li>
          */}
          <li><Link to="/add-policy">Add Policies</Link></li>
          <li><Link to="/view-all-policies">All Policies</Link></li>
          <li><Link to="/ClaimAcceptReject">All Claims</Link></li>
          <li><Link to="/all-payments">All Payments</Link></li>
          <li><Link to="/view-all-users">All Users</Link></li>
        </ul>
      </div>
      <div className="login">
            <button className='Login-btn text-white'>View User policies</button>
            {/* <ul className="drop-down">
                <li><a href="/health-applications">HealthPolicy Approval</a> </li>
                <li> <a href="/home-applications">HomePolicy Approval</a></li>
                <li><a href="/life-applications">LifePolicy Approval</a></li>
                <li><a href="/vehicle-applications">VehiclePolicy Approval</a></li>
                <li><a href="/travel-applications">TravelPolicy Approval</a></li>
            </ul> */}
            {
              <ul className="drop-down">
                <li>
                <Link to="/health-applied-users">HealthPolicy</Link>
                </li>
                <li>
                <Link to="/home-applied-users">HomePolicy</Link>
                </li>
                <li>
                <Link to="/life-applied-users">LifePolicy</Link>
                </li>
                <li>
                <Link to="/vehicle-applied-users">VehiclePolicy</Link>
                </li>
                <li>
                 <Link to="/travel-applied-users">TravelPolicy</Link>
                </li>
              </ul>
            }
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
