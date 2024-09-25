import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/api/employees";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(URL);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setEmployees(employees.filter(employee => employee._id !== id));
            alert("Employee deleted successfully");
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee. Please try again.");
        }
    };

    const filteredEmployees = employees.filter(employee => {
        return (
            employee?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee?.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee?.EID?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const exportToCSV = () => {
        if (filteredEmployees.length === 0) {
            alert("No employees to export");
            return;
        }

        const csvData = [
            ['ID', 'First Name', 'Last Name', 'Email', 'Contact Number'],
            ...filteredEmployees.map(employee => [
                employee.EID,
                employee.FirstName,
                employee.LastName,
                employee.Email,
                employee.ContactNumber,
            ]),
        ];

        const csvContent = "data:text/csv;charset=utf-8," 
            + csvData.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "employees_report.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex-1 pt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-3xl">
                    <h2 className="text-xl font-bold text-gray-600 mb-4">Employee List</h2>

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by ID, First Name, or Last Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={exportToCSV}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        Export to CSV
                    </button>

                    <table className="min-w-full bg-gray-400 border border-gray-200">
                        <thead>
                            <tr className='border'>
                                <th className="py-2 font-bold px-4 border font-semibold text-left">ID</th>
                                <th className="py-2 px-4 border font-semibold text-left">First Name</th>
                                <th className="py-2 px-4 border font-semibold text-left">Last Name</th>
                                <th className="py-2 px-4 border font-semibold text-left">Email</th>
                                <th className="py-2 px-4 border font-semibold text-left">Contact Number</th>
                                <th className="py-2 px-4 border font-semibold text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee._id} className="border-b">
                                        <td className="py-2 px-4 border">{employee.EID}</td>
                                        <td className="py-2 px-4 border">{employee.FirstName}</td>
                                        <td className="py-2 px-4 border">{employee.LastName}</td>
                                        <td className="py-2 px-4 border">{employee.Email}</td>
                                        <td className="py-2 px-4 border">{employee.ContactNumber}</td>
                                        <td className="py-2 px-4 flex space-x-2">
                                            <Link to={`/employee-manage/${employee._id}`} className="bg-white p-2 rounded-lg text-blue-500 hover:underline">Update</Link>
                                            <button
                                                onClick={() => deleteEmployee(employee._id)}
                                                className="bg-red-400 text-white p-2 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
