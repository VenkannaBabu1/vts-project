import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import './AdminViewAllUsers.css';
import UserNav from './AdminNav';


function AdminViewAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/user/admin/get-all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
            if (response.data) {
                setUsers(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.log("Fetching data error", error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNav />
        <div className='AdminViewAllUsers'>
            <h1 className="text-center mb-1 h1 text-black">ALL USERS</h1>
            <div className='container mt-4 shadow p-3 text-center'>
                <table className="table table-striped text-center pt-3">
                    <thead className='p-2'>
                        <tr className='text-center p-4'>
                            <th>S.No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Aadhaar/PAN</th>
                            <th>State</th>
                            {/* <th>Pincode</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={11}>Loading Data.....</td></tr>
                        ) : (
                            users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.firstname}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.lastname}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.dob}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.email}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.phno}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.gender}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.address}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.adhaarPan}</td>
                                        <td style={{ verticalAlign: "middle" }}>{user.state}</td>
                                        {/* <td style={{ verticalAlign: "middle" }}>{user.pincode}</td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={11}>No Data Found</td></tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default AdminViewAllUsers;
