const addEmployee = async (req, res, next) => {
  console.log(req.body); // Log incoming request to debug
  const { ID, firstName, LastName, Contact, gmail, CustType } = req.body;

  let employee;
  try {
      employee = new Employee({ ID, firstName, LastName, Contact, gmail, CustType });
      await employee.save();
      return res.status(201).json({ employee });
  } catch (err) {
      console.error("Error adding employee:", err);
      return res.status(500).json({ message: "Unable to add Employee", error: err.message });
  }
};
