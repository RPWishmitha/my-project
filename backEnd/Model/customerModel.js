const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({
    CID: { type: String, required: true },   // Customer ID instead of Employee ID
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true }
});

module.exports = mongoose.model("Customer", customerSchema);
