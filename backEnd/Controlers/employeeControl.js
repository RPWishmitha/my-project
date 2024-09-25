const Employee = require("../Model/employeeModel");

const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employees", err });
    }
};

const addEmployee = async (req, res, next) => {
    const { EID, FirstName, LastName, ContactNumber, Email } = req.body;
    try {
        const newEmployee = new Employee({ EID, FirstName, LastName, ContactNumber, Email });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: "Error adding employee", err });
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { EID, FirstName, LastName, ContactNumber, Email } = req.body;
    
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { EID, FirstName, LastName, ContactNumber, Email },
            { new: true }
        );
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(500).json({ message: "Error updating employee", err });
    }
};


const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting employee", err });
    }
};

exports.getAllEmployees = getAllEmployees;
exports.addEmployee = addEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
