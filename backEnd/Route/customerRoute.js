const express = require("express");
const { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } = require("../Controlers/customerControl");

const router = express.Router();

router.get("/", getAllCustomers); // Get all customers
router.post("/", addCustomer);    // Add a new customer
router.put("/:id", updateCustomer); // Update a customer by ID
router.delete("/:id", deleteCustomer); // Delete a customer by ID

module.exports = router;
