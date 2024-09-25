const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    EID: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
