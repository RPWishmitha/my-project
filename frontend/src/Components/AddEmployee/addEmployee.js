import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addEmployee.css';

const URL = "http://localhost:5000/api/employees";

export default function AddEmployee() {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({
        EID: "",
        FirstName: "",
        LastName: "",
        ContactNumber: "",
        Email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URL, employeeData);
            alert("Employee added successfully");
            setEmployeeData({
                EID: "",
                FirstName: "",
                LastName: "",
                ContactNumber: "",
                Email: "",
            });
            navigate("/employee-manage");
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee. Please try again.");
        }
    };

    const handleReset = () => {
        setEmployeeData({
            EID: "",
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
                    <h2 className="text-xl font-bold text-gray-600 mb-4">Add Employee</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="EID" className="text-sm font-medium text-gray-600">Employee ID:</label>
                            <input
                                type="text"
                                id="EID"
                                name="EID"
                                value={employeeData.EID}
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
                                value={employeeData.FirstName}
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
                                value={employeeData.LastName}
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
                                value={employeeData.ContactNumber}
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
                                value={employeeData.Email}
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
