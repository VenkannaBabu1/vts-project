import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const VehicleApplications = () => {
    const [applications, setApplications] = useState([]);
    const base_url = `${import.meta.env.VITE_URL}`;

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`${base_url}/applications`);
                setApplications(response.data);
            } catch (error) {
                console.log(error);
                alert('Error fetching applications');
            }
        };

        fetchApplications();
    }, []);

    const handleApprove = async (id) => {
        const startDate = moment().format('YYYY-MM-DD');
        const endDate = moment().add(2, 'years').format('YYYY-MM-DD');

        try {
            await axios.put(`${base_url}/applications/${id}`, {
                startDate,
                endDate,
                status: 'approved'
            });

            setApplications(prevApplications => 
                prevApplications.map(app => 
                    app.id === id ? { ...app, status: 'approved', startDate, endDate } : app
                )
            );
        } catch (error) {
            console.log(error);
            alert('Error approving application');
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`${base_url}/applications/${id}`, {
                status: 'rejected'
            });

            setApplications(prevApplications => 
                prevApplications.map(app => 
                    app.id === id ? { ...app, status: 'rejected' } : app
                )
            );
        } catch (error) {
            console.log(error);
            alert('Error rejecting application');
        }
    };

    return (
        <div className='container'>
            <h2 className="text-center">Vehicle Applications</h2>
            <div className="row">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr className='text-primary'>
                            <th>id</th>
                            <th>email</th>
                            <th>policyNumber</th>
                            <th>vehicleNumber</th>
                            <th>vehicleCompany</th>
                            <th>vehicleModel</th>
                            <th>chassisNumber</th>
                            <th>ManufacturingYear</th>
                            <th>documentImage</th>
                            <th>startDate</th>
                            <th>endDate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app.id}>
                                <td>{index + 1}</td>
                                <td>{app.email}</td>
                                <td>{app.policyNumber}</td>
                                <td>{app.vehicleNumber}</td>
                                <td>{app.vehicleCompany}</td>
                                <td>{app.vehicleModel}</td>
                                <td>{app.chassisNumber}</td>
                                <td>{app.ManufacturingYear}</td>
                                <td><img src={`data:image/png;base64,${app.documentImage}`} alt="Document" /></td>
                                <td>{app.startDate}</td>
                                <td>{app.endDate}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status !== 'approved' && (
                                        <button
                                            style={{ marginLeft: "10px" }}
                                            className="btn btn-success"
                                            onClick={() => handleApprove(app.id)}
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {app.status !== 'rejected' && (
                                        <button
                                            style={{ marginLeft: "10px" }}
                                            className="btn btn-danger"
                                            onClick={() => handleReject(app.id)}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleApplications;
