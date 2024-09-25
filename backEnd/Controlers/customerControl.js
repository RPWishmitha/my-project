const Customer = require("../Model/customerModel");

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: "Error fetching customers", err });
    }
};

const addCustomer = async (req, res, next) => {
    const { CID, FirstName, LastName, ContactNumber, Email } = req.body;
    try {
        const newCustomer = new Customer({ CID, FirstName, LastName, ContactNumber, Email });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ message: "Error adding customer", err });
    }
};

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { CID, FirstName, LastName, ContactNumber, Email } = req.body;
    
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { CID, FirstName, LastName, ContactNumber, Email },
            { new: true }
        );
        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ message: "Error updating customer", err });
    }
};

const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting customer", err });
    }
};

exports.getAllCustomers = getAllCustomers;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
