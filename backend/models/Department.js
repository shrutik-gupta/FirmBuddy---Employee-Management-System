import mongoose, { Mongoose } from "mongoose"
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";
import User from "./User.js";

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    dep_desc: { type: String, required: true }
});

departmentSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try{
        const employees = await Employee.find({ emp_dept: this._id })
        const empIds = employees.map(emp => emp._id)
        await Employee.deleteMany({ emp_dept: this._id })
        await Leave.deleteMany({ emp_id: { $in: empIds } })
        await Salary.deleteMany({ emp_id: { $in: empIds } })
        next()
    }
    catch(error) {
        next(error)
    }
})

const Department = mongoose.model('Department', departmentSchema);
export default Department