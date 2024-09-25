import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import AddEmployee from "./Components/AddEmployee/addEmployee";
import AddCustomer from "./Components/AddCustomer/addCustomer.js";
import UpdateEmployee from "./Components/updateEmployee/updateEmployee.js";
import UpdateCustomer from "./Components/updateCustomer/updateCustomer.js";
import NavBar from "./Components/Nav/nav.js";
import EmployeeList from "./Components/EmployeeList/EmployeeList.js";
import CustomerList from "./Components/CustomerList/CustomerList.js";


function App() {

  return (
    
    <div>
      <NavBar/>
      <React.Fragment>
        <Routes>
        <Route path="/" element={<AddEmployee/>}/>  
        <Route path="/addEmployee" element={<AddEmployee/>}/>
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/" element={<UpdateEmployee/>}/> 
        <Route path="/updateEmployee" element={<UpdateEmployee/>}/>
        <Route path="/updateCustomer" element={<UpdateCustomer/>}/>
        <Route path="/employee-manage" element={<EmployeeList />} />
        <Route path="/customer-manage" element={<CustomerList />} />
        <Route path="/employee-manage/:id" element={<UpdateEmployee />} />
        <Route path="/customer-manage/:id" element={<UpdateCustomer />} />
        
        
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
