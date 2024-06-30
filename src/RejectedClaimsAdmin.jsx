import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Rejected.css';
const RejectedClaimsAdmin = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/claim/vstatu?status=true`);
      setData(response.data);
    //   setFilteredData(response.data); // Initialize filteredData with all data
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

//   const handleSearchClick = () => {
//     if (searchVal === '') {
//       setFilteredData(originalData); // Reset to show all data
//     } else {
//       const filtered = originalData.filter((item) =>
//         Object.values(item).some((value) =>
//           value.toString().toLowerCase().includes(searchVal.toLowerCase())
//         )
//       );
//       setFilteredData(filtered);
//     }
//   };

  return (
    <div className='css'>
    <div className="rejected-claims">
      <h2>Rejected Claims</h2>

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
          {data.map(user => (
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
              <td>{user.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RejectedClaimsAdmin;