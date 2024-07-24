const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('../config/genrateToken');


exports.addEmployee = async(req, res)=>{

    try {
        
        const { employeeId, firstName, lastName, email, number, position, joiningDate } = req.body;

        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ email });
    
        if (existingEmployee) {
          return res.status(400).json({ message: "Employee with this email already exists" });
        }
    
        // Generate a random password
        const passcode = generator.generate({
          length: 15, 
          numbers: true
        });
        const password = passcode.toString();
    
        // Hash the generated password
        const hashPassword = await bcrypt.hash(password, 10);
    
        // Create a new Employee document
        const newEmployee = new Employee({
          employeeId,
          firstName,
          lastName,
          email,
          number,
          position,
          joiningDate,
          password: hashPassword
        });
    
        // Save the new employee to the database
        await newEmployee.save();
    
        return res.status(200).json({ message: 'Employee added successfully', employee: newEmployee });
    
    } catch (error) {
        res.status(500).send("server error "  + error);
    }
}


exports.employeeLogin = async(req, res)=>{

 
    try {
        const { email, password } = req.body;
    
        // Find employee by email
        const employee = await Employee.findOne({ email });
    
        // Check if employee exists
        if (!employee) {
          return res.status(400).json({ msg: "Employee details not found" });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, employee.password);
    
        if (!passwordMatch) {
          return res.status(400).json({ msg: "Incorrect password" });
        }
    
        // Login successful

        token = jwt.generateToken();

        return res.status(200).json({
          success: "employee logged In",
          Token: token
        });
    
      } catch (error) {
        console.error("Error in employeeLogin:", error.message);
        return res.status(500).json({ msg: "Server error" });
      }
}

exports.employeeFetch = async (req,res) =>{
  try {
    const id = req.params.id ;
    console.log(id);

    if(!id){
      return res.status(404).json({message : "id not found"})
    }
    const employee = await Employee.findById(id)
    console.log(employee)

    if(!employee){
      return res.status(404).json({message : "employee not found"})
    }
    return res.status(200).json({message : "id is successfuly",employee})

  } catch (error) {
    res.status(500).json({ error : message.error})
  }
}

exports.employeeDelet = async(req, res) =>{

  try {
    const id = req.params.id ;
    console.log(id)
    if(!id){
      return res.status(404).json({message : "delete id not found !"});
    }
    const employee = await Employee.findByIdAndDelete(id);
    console.log(employee);
    if(!employee){
      return res.status(404).json({ message : "employee not found"})
    }
    return res.status(200).json({ message : "employee deleted successfuly", employee})
  } catch (error) {
    res.status(500).json({ error : message.error})
  }

}







// exports.employeeId = async(req ,res) =>{
//   try {
//     const { id } = req.params;
//     const shifts = await findAll({ where: { employeeId: id } });
//     res.json(shifts);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

// }



// app.post('/shifts', async (req, res) => {
//   try {
//     const { employeeId, startTime } = req.body;
//     const start_time = new Date(startTime);
//     const end_time = new Date(start_time.getTime() + 9 * 60 * 60 * 1000); // 9 hours later
//     const shift = await Shift.create({ employeeId, start_time, end_time });
//     res.status(201).json(shift);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// app.post('/employees', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const employee = await Employee.create({ name });
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });





