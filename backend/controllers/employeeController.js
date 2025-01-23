import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import multer from "multer"; //to work with image
import path from 'path';
import Department from "../models/Department.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        const {
            emp_name,
            emp_email,
            emp_id,
            emp_dob,
            emp_gender,
            emp_marital_status,
            emp_designation,
            emp_dept,
            emp_salary,
            emp_password,
            emp_role
        } = req.body;

        const user = await User.findOne({ emp_email })

        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }
        else {
            const hashedPassword = await bcrypt.hash(emp_password, 10)
            const newUser = new User({
                name: emp_name,
                email: emp_email,
                password: hashedPassword,
                role: emp_role,
                profileImage: req.file ? req.file.filename : ""
            })
            const savedUser = await newUser.save();

            const newEmployee = new Employee({
                user_id: savedUser._id,
                emp_id,
                emp_dob,
                emp_gender,
                emp_marital_status,
                emp_designation,
                emp_dept,
                emp_salary,
            });
            await newEmployee.save();
            return res.status(200).json({ success: true, message: "employee created" });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "add employee server error" });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('user_id', { password: 0 }).populate('emp_dept')
        return res.status(200).json({ success: true, employees });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'fetch employees server error' })
    }
}

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        let employee;
        employee = await Employee.findById({ _id: id }).populate('user_id', { password: 0 }).populate('emp_dept')
        if (!employee) {
            employee = await Employee.findOne({ user_id: id }).populate('user_id', { password: 0 }).populate('emp_dept')
            return res.status(200).json({ success: true, employee });
        }
        return res.status(200).json({ success: true, employee });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: "get employee server error" });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {
            emp_name,
            emp_marital_status,
            emp_designation,
            emp_dept,
            emp_salary
        } = req.body;
        const { id } = req.params;

        // Find employee first
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Find associated user
        const user = await User.findById(employee.user_id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                emp_marital_status,
                emp_designation,
                emp_dept,
                emp_salary
            },
            // { new: true }  // This returns the updated document
        );

        // Update associated user's name
        await User.findByIdAndUpdate(
            employee.user_id,
            { name: emp_name }
        );

        return res.status(200).json({
            success: true,
            employee: updatedEmployee
        });
    }
    catch (err) {
        console.error(err); // Add this for debugging
        return res.status(500).json({
            success: false,
            error: "Edit employee server error"
        });
    }
}

const fetchEmployeesByDepartment = async (req, res) => {
    try {
        const { deptId } = req.params;
        const employees = await Employee.find({ emp_dept: deptId })
            .populate('user_id', '-password')
            .populate('emp_dept');

        return res.status(200).json({ success: true, employees });
    }
    catch (err) {
        console.error("Fetch employees by department error:", err);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};
export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepartment }