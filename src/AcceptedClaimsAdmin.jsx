import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HealthForm.css'; // Ensure you import the correct CSS file

const AcceptedClaimsAdmin = () => {
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/claim/vstatus?status=true`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const filteredData = searchVal
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchVal.toLowerCase())
        )
      )
    : data;

  return (
    <div className='css'>
      <div className="rejected-claims">
        <h2>Accepted Claims</h2>

        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          value={searchVal}
          onChange={handleSearchChange}
          placeholder="Search by user email, policy name, policy id, etc."
        />
        {/* <button onClick={handleSearchClick} className='sea'>Search</button> */}

        <table>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Policy Name</th>
              <th>Policy Id</th>
              <th>Policy No</th>
              <th>Description</th>
              <th>Status</th>
              <th>Image Proof</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.policyName}</td>
                <td>{user.policyid}</td>
                <td>{user.policyno}</td>
                <td>{user.description}</td>
                <td>{user.status}</td>
                <td>
                  <img
                    src={`data:image/png;base64,${user.image}`}
                    alt="proof"
                    className="pack-images"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptedClaimsAdmin;
