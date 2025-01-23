import Salary from '../models/Salary.js'
import Employee from '../models/Employee.js'

const addSalary = async (req, res) => {
    try {
        const {
            emp_id,
            emp_basic_salary,
            emp_allowances,
            emp_deductions,
            emp_pay_date
        } = req.body;
        const totalSalary = parseInt(emp_basic_salary) + parseInt(emp_allowances) - parseInt(emp_deductions);

        const newSalary = new Salary({
            emp_id,
            emp_basic_salary,
            emp_allowances,
            emp_deductions,
            emp_net_salary: totalSalary,
            emp_pay_date
        })
        await newSalary.save();
        return res.status(200).json({ success: true });
    }
    catch (e) {
        res.status(500).json({ success: false, error: "Add salary server error" })
    }
}

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find employee first
        const employee = await Employee.findOne({ 
            $or: [
                { _id: id },
                { user_id: id }
            ]
        });
        
        if (!employee) {
            return res.status(200).json({ success: true, salary: [] });
        }
        
        // Find salaries for the employee
        const salary = await Salary.find({ emp_id: employee._id })
            .populate('emp_id', 'emp_id emp_name');
        
        return res.status(200).json({ success: true, salary });
    }
    catch (error) {
        console.error('Get salary error:', error);
        return res.status(500).json({ success: false, error: 'Get salary server error' });
    }
};

export { addSalary, getSalary }