import mongoose, { Mongoose } from "mongoose"
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    emp_id: {type: String, unique: true, required: true},
    emp_dob : {type: Date},
    emp_gender : {type: String},
    emp_marital_status : {type: String},
    emp_designation : {type: String},
    emp_dept : {type: Schema.Types.ObjectId, ref: 'Department', required: true},
    emp_salary : {type: Number, required: true}
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee