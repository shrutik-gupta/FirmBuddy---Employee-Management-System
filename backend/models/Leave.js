import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    emp_id: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    leave_type:{
        type: String,
        required: true,
        enum: ['Sick Leave', 'Casual Leave', 'Annual Leave']
    },
    leave_start_date: {type: Date, required: true},
    leave_end_date: {type: Date, required: true},
    leave_reason: {type: String, required: true},
    leave_status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    leave_applied_date: {type: Date, required: true, default: Date.now},
})

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;