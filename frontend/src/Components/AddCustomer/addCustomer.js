import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addCustomer.css';

const URL = "http://localhost:5000/api/customers";

export default function AddCustomer() {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({
        CID: "",
        FirstName: "",
        LastName: "",
        ContactNumber: "",
        Email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URL, customerData);
            alert("Customer added successfully");
            setCustomerData({
                CID: "",
                FirstName: "",
                LastName: "",
                ContactNumber: "",
                Email: "",
            });
            navigate("/customer-manage");
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("Failed to add customer. Please try again.");
        }
    };

    const handleReset = () => {
        setCustomerData({
            CID: "",
            FirstName: "",
            LastName: "",
            ContactNumber: "",
            Email: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex-1 pt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-xl">
                    <h2 className="text-xl font-bold text-gray-600 mb-4">Add Customer</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="CID" className="text-sm font-medium text-gray-600">Customer ID:</label>
                            <input
                                type="text"
                                id="CID"
                                name="CID"
                                value={customerData.CID}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="FirstName" className="text-sm font-medium text-gray-600">First Name:</label>
                            <input
                                type="text"
                                id="FirstName"
                                name="FirstName"
                                value={customerData.FirstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="LastName" className="text-sm font-medium text-gray-600">Last Name:</label>
                            <input
                                type="text"
                                id="LastName"
                                name="LastName"
                                value={customerData.LastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ContactNumber" className="text-sm font-medium text-gray-600">Contact Number:</label>
                            <input
                                type="text"
                                id="ContactNumber"
                                name="ContactNumber"
                                value={customerData.ContactNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Email" className="text-sm font-medium text-gray-600">Email:</label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                value={customerData.Email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-gray-400 text-white py-2 px-4 rounded-lg">Add</button>
                            <button type="button" onClick={handleReset} className="bg-red-400 text-white py-2 px-4 rounded-lg">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
