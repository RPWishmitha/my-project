const express = require("express");
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require("../Controlers/employeeControl");

const router = express.Router();

router.get("/", getAllEmployees); // Ensure getAllEmployees is correctly imported
router.post("/", addEmployee); 
router.put("/:id", updateEmployee); 
router.delete("/:id", deleteEmployee); 

module.exports = router;
