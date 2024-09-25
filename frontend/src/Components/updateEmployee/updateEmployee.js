import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEmployee() {
  const [inputs, setInputs] = useState({
    EID: '', 
    FirstName: '', 
    LastName: '', 
    ContactNumber: '', 
    Email: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setInputs(res.data); // Assuming the response has the employee data directly
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, {
        FirstName: String(inputs.FirstName),
        LastName: String(inputs.LastName),
        ContactNumber: String(inputs.ContactNumber),
        Email: String(inputs.Email),
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    alert("Employee updated successfully");
    navigate("/employee-manage"); // Adjust this to the correct route
  };

  return (
    <form onSubmit={handleSubmit} className='min-h-screen'>
      <div>
      <h1>Update Employee</h1><br></br>
      <input
        name="EID"
        value={inputs.EID}
        onChange={handleChange}
        placeholder="Employee ID"
        disabled
      />
      <input
        name="FirstName"
        value={inputs.FirstName}
        onChange={handleChange}
        placeholder="First Name"
        
      />
      <input
        name="LastName"
        value={inputs.LastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="ContactNumber"
        value={inputs.ContactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
      />
      <input
        name="Email"
        value={inputs.Email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Update Employee</button>
      </div>
    </form>
  );
}

export default UpdateEmployee;
