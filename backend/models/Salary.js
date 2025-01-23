import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
    emp_id: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    emp_basic_salary: {type: Number, required: true},
    emp_allowances: {type: Number},
    emp_deductions: {type: Number},
    emp_net_salary: {type: Number},
    emp_pay_date: {type: Date, required: true},
})

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;