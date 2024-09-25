////password- "y7cPi2HlBATBtm3T"
const express = require("express");
const mongoose = require("mongoose");
const employeeRoute = require("./Route/employeeRoute");
const customerRoute = require("./Route/customerRoute");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoute);
app.use("/api/customers", customerRoute);

mongoose.connect("mongodb+srv://flower:flower123@mern-flower.ryxgv.mongodb.net/?retryWrites=true&w=majority&appName=mern-flower")
.then(() => console.log('Connected to MongoDB'))
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log('Error connecting to MongoDB:', err));
