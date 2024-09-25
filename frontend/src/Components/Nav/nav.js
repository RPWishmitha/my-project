import React, { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
         <button className="toggle-button" onClick={toggleNav}>
                &#9776; {/* This is the hamburger icon */}
            </button>
            <div className="nav-container">
                <Link to="/" className="nav-logo">Employee Management</Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/addEmployee" className="nav-link">Add Employee</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Employee-manage" className="nav-link">Your Employee List</Link>
                    </li>
                    </ul><br/>
                    

                    <Link to="/" className="nav-logo">Customer Management</Link>
                <ul className="nav-menu ">
                    <li className="nav-item">
                        <Link to="/addCustomer" className="nav-link">Add Customer</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Customer-manage" className="nav-link">Your Customer List</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;