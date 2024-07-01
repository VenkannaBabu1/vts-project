import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserNav = () => {
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
                  {/* <a href="/user-all-policies">All Policies</a> */}
                  <button onClick={() => {navigate("/user-all-policies")}}>All Policies</button>
                </li>
                <li>
                    {/* <a href="/my-policies">My Policies</a> */}
                    <button onClick={() => {navigate("/my-policies")}}>My Policies</button>
                </li>
                <li>
                    {/* <a href="/claimstatus">Claims </a> */}
                    <button onClick={() => {navigate("/claimstatus")}}>Claims</button>
                </li>
                <li>
                    {/* <a href="/user-payments">Payments</a> */}
                    <button onClick={() => {navigate("/user-payments")}}>Payments</button>
                </li>
                
                
                
            </ul>
        </div>
          <div className="btn">
            <button  onClick={()=> { localStorage.removeItem('token'), navigate('/')}} className='hover:bg-white hover:text-blue-500 p-2 rounded-md'>Log Out</button>
          </div>
    </div>
  )
}

export default UserNav
