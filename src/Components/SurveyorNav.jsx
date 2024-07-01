import React from 'react'

import "./Navbar/Navbar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
const SurveyorNav = () => {

  const navigate=useNavigate();
  return (
    <div className='flex flex-row bg-[#1869b0] text-white justify-around p-4 text-[20px] items-center'>
        <div className="navbar flex flex-row items-center space-x-5">
                <img src="https://orientalinsurance.org.in/static/media/oicl-logo.929a7ab1475dedd01b32.png" alt="" width={50} />
                <h1>Company</h1>
        </div>
        <div className='nav-items '>
            <ul className='flex flex-row space-x-20'>
                <li>
                  {/* <a href='/ClaimAcceptRejectAgent'>All Claims</a> */}
                  <button onClick={() => {navigate("/ClaimAcceptRejectAgent")}}>All Claims</button>
                </li>
                <div className="login">
            <button className='Login-btn text-white'>policies</button>
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
                <Link to="/health-applications">HealthPolicy Approval</Link>
                </li>
                <li>
                <Link to="/home-applications">HomePolicy Approval</Link>
                </li>
                <li>
                <Link to="/life-applications">LifePolicy Approval</Link>
                </li>
                <li>
                <Link to="/vehicle-applications">VehiclePolicy Approval</Link>
                </li>
                <li>
                 <Link to="/travel-applications">TravelPolicy Approval</Link>
                </li>
              </ul>
            }
        </div>
                {/* <li>
                    <a href="/accepted-claims">Claims Approved</a>
                </li>
               */}
                
            </ul>
        </div>
          <div className="btn">
            <button className='hover:bg-white hover:text-blue-500 p-2 rounded-md' onClick={()=> { localStorage.removeItem('token'), navigate('/')}}>Log Out</button>
          </div>
    </div>
  )
}

export default SurveyorNav