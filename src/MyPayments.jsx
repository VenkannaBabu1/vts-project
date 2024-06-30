import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPayments = () => {
    const [payments, setPayments] = useState([]);

    const base_url = `${import.meta.env.VITE_URL}`;

    const getToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = getToken();
                const response = await axios.get(`${base_url}/payments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPayments(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className='container'>
            <h2 className="text-center">My Payments</h2>
            <div className="row">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr className='text-primary'>
                            <th>id</th>
                            <th>transactionId</th>
                            <th>referenceId</th>
                            <th>amount</th>
                            <th>policyId</th>
                            <th>PolicyNumber</th>
                            {/* <th>imageProof</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.referenceId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.policyId}</td>
                                <td>{payment.PolicyNO}</td>
                                {/* <td><img src={data:image/png;base64,${payment.imageProof}} alt="Proof" /></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPayments;