import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import UserNav from '../UserNav';
import Footer from '../Footer';
// import UserNav from './UserNav';
//import Footer from "./Footer";


function UserProfile() {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    phno: '',
    gender: '',
    address: '',
    adhaarPan: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/user/get-profile`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/text',
          }
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error('Error in fetching profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />
      <div className='user-profile'>
    <div className="profilemaincontainer">
      <div className="profile-row">
        <div className="profile-col-lg-7 profile-mx-auto">
          <div className="profile-card mt-2 mb-3 profile-mx-auto profile-p-4 profile-bg-light">
            <div className="profile-card-body profile-bg-light">
              <div className="profile-container">
                <div className="profile-text-center">
                  <h1>View Profile</h1>
                </div>
                <div className="profile-controls">
                  <form id="profile-form" role="form">
                    <div className="profile-row mb-3">
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="firstname">First Name</label>
                          <input
                            id="firstname"
                            type="text"
                            name="firstname"
                            className="profile-form-control"
                            value={profile.firstname}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="lastname">Last Name</label>
                          <input
                            id="lastname"
                            type="text"
                            name="lastname"
                            className="profile-form-control"
                            value={profile.lastname}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile-row mb-3">
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="dob">Date Of Birth</label>
                          <input
                            id="dob"
                            type="date"
                            name="dob"
                            className="profile-form-control"
                            value={profile.dob}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="profile-form-control"
                            value={profile.email}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile-row mb-3">
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="phno">Phone Number</label>
                          <input
                            id="phno"
                            type="text"
                            name="phno"
                            className="profile-form-control"
                            value={profile.phno}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="adhaarPan">AadharPan</label>
                          <input
                            id="adhaarPan"
                            type="text"
                            name="adhaarPan"
                            className="profile-form-control"
                            value={profile.adhaarPan}
                            readOnly
                          />
                        </div>
                      </div>
                      {/* <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="gender">Gender</label>
                          <input
                            id="gender"
                            type="text"
                            name="gender"
                            className="profile-form-control"
                            value={profile.gender}
                            readOnly
                          />
                        </div>
                      </div> */}
                    </div>
                    <div className="profile-row mb-3 m-3">
                      <div className="profile col-md-12">
                        <div className="profile-form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            id="address"
                            type="text"
                            name="address"
                            className="profile-form-control"
                            value={profile.address}
                            readOnly
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="profile-row mb-3">
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="state">State</label>
                          <input
                            id="state"
                            type="text"
                            name="state"
                            className="profile-form-control"
                            value={profile.state}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="profile-col-md-6">
                        <div className="profile-form-group">
                          <label htmlFor="pincode">Pincode</label>
                          <input
                            id="pincode"
                            type="text"
                            name="pincode"
                            className="profile-form-control"
                            value={profile.pincode}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile-text-center">
                      <button onClick={() => navigate('/user-dashboard')} className="profile-btn-logout">Back</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<div>
</div>
    <Footer />
   </div>
    </div>
  );
}

export default UserProfile;
