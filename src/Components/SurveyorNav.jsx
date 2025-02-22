import React from 'react'

import "./Navbar/Navbar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
const SurveyorNav = () => {

  const navigate=useNavigate();
  return (
    <div className='flex flex-row  text-white justify-around p-4 text-[20px] items-center' style={{ background: 'linear-gradient(to right, #6fc0e1,rgba(15, 24, 299, 0.8))' }}>
        <div className="navbar flex flex-row items-center space-x-5">
                <img src="https://media.licdn.com/dms/image/D4E0BAQHIdgdBRY-q9A/company-logo_200_200/0/1714975480286/vts_enterprises_india_private_limited_logo?e=2147483647&v=beta&t=0hXdwCVYy7a-iG76DUGYrO5faw5pSgHsA3WLlAclGkY" alt="" width={50} style={{borderRadius:'20px'}} />
                <h1>VTS Insurance</h1>
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
            <button className='hover:bg-blue-500 p-2 rounded-md  text-white p-2 rounded-md' onClick={()=> { localStorage.removeItem('token'), navigate('/')}}>Log Out</button>
          </div>
    </div>
  )
}

export default SurveyorNav