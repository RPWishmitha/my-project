import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateCustomer() {
  const [inputs, setInputs] = useState({
    CID: '', 
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
        const res = await axios.get(`http://localhost:5000/api/customers/${id}`);
        setInputs(res.data); // Assuming the response has the customer data directly
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, {
        FirstName: String(inputs.FirstName),
        LastName: String(inputs.LastName),
        ContactNumber: String(inputs.ContactNumber),
        Email: String(inputs.Email),
      });
    } catch (error) {
      console.error("Error updating customer:", error);
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
    alert("Customer updated successfully");
    navigate("/customer-manage"); // Adjust this to the correct route
  };

  return (
    <form onSubmit={handleSubmit} className='min-h-screen'>
      <dev><h1>Update Customer</h1><br></br>
      <input
        name="CID"
        value={inputs.CID}
        onChange={handleChange}
        placeholder="Customer ID"
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
      
      <button type="submit">Update Customer</button>
      </dev>
    </form>
  );
}

export default UpdateCustomer;
