import React from 'react'
import "../Navbar/Navbar.css"
import { IoCall } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom"
const Navbar = () => {
    const navigate=useNavigate();
   
  return (
    <>
    
   <nav>
    <div className="wrapper">
        <div className="logo" >
            <img src="https://media.licdn.com/dms/image/D4E0BAQHIdgdBRY-q9A/company-logo_200_200/0/1714975480286/vts_enterprises_india_private_limited_logo?e=2147483647&v=beta&t=0hXdwCVYy7a-iG76DUGYrO5faw5pSgHsA3WLlAclGkY" alt="" style={{borderRadius:'20px'}}/>
            <a href="">VTS Insurance</a>
        </div>
        <ul className="nav-links">
            <li>
               <a href="">Home</a>
            </li>
            <li>
               <a href="">Products </a>
                 <div className="content">
                    <div className="row">
                        <header>Motor Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">2 Wheeler</a></li>
                            <li><a href="">4 Wheeler</a></li>
                            <li><a href="">Commercial Vehicle Goods</a></li>
                            <li><a href="">Commercial Vehicle Passengers</a></li>
                        </ul>
                    </div>
                    <div className="row">
                        <header>Health Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">Arogya Sanjeevani</a></li>
                            <li><a href="">Happy Family</a></li>
                            <li><a href="">Super Health Top-up</a></li>
                            <li><a href="">Arogya Shree</a></li>
                        </ul>
                    </div>
                    <div className="row">
                        <header>Travel Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">International Travel</a></li>
                            <li><a href="">Yatra Bima</a></li>
                            <li><a href="">Yuva yatra Bima</a></li>
                            <li><a href="">Durgatra Bima</a></li>
                        </ul>
                    </div>
                    <div className="row">
                        <header>Home Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">Swagruha Policy</a></li>
                            <li><a href="">Homeshield(Surakshit Griharaksha)</a></li>
                            <li><a href="">SUraksha Bima</a></li>
                          
                        </ul>
                    </div>
                    <div className="row">
                        <header>Life Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">Whole Life</a></li>
                            <li><a href="">Term Life</a></li>
                            
                        </ul>
                    </div>
                    <div className="row">
                        <header>Accident Policies</header>
                        <ul className='mega-links'>
                            <li><a href="">Comprehensive</a></li>
                            <li><a href="">Collision</a></li>
                           
                        </ul>
                    </div>
                 </div>
            </li>
            <li>
               <a href="">About Us</a>
            </li>
            <li>
              
              <Link to="/contact-us">Contact Us</Link>
            </li>
            
            
            

        </ul>
        <div className="login">
            <button className='Login-btn text-white' onClick={()=>navigate("/login")}>Login</button>
            {/* <ul className="drop-down">
                <li>User</li>
                <li>Surveyor</li>
                <li>Admin</li>
            </ul> */}
        </div>
    </div>
   </nav>
   </>
  )
}

export default Navbar
