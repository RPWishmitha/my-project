import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = "http://localhost:5000/api/customers";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(URL);
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setCustomers(customers.filter(customer => customer._id !== id));
            alert("Customer deleted successfully");
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert("Failed to delete customer. Please try again.");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer => 
        customer.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.ContactNumber.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex-1 pt-16">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-3xl">
                    <h2 className="text-xl font-bold text-gray-600 mb-4">Customer List</h2>
                    
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or Contact Number"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 border rounded-lg w-full"
                    />
                    
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
                            {filteredCustomers.map((customer) => (
                                <tr key={customer._id} className="border-b">
                                    <td className="py-2 px-4 border">{customer.CID}</td>
                                    <td className="py-2 px-4 border">{customer.FirstName}</td>
                                    <td className="py-2 px-4 border">{customer.LastName}</td>
                                    <td className="py-2 px-4 border">{customer.Email}</td>
                                    <td className="py-2 px-4 border">{customer.ContactNumber}</td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <Link to={`/customer-manage/${customer._id}`} className="bg-white">Update</Link><br></br>
                                        <button
                                            onClick={() => deleteCustomer(customer._id)}
                                            className="bg-red-400"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomerList;
