import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'

const addLeave = async (req, res) => {
    try {
        const {
            user_id,
            leave_type,
            leave_start_date,
            leave_end_date,
            leave_reason
        } = req.body;
        const employee = await Employee.findOne({ user_id }) //we are passing user id from server but in db we are using emp_id
        const newLeave = new Leave({
            emp_id: employee._id,
            leave_type,
            leave_start_date,
            leave_end_date,
            leave_reason
        })
        await newLeave.save();
        return res.status(200).json({ success: true });
    }
    catch (e) {
        res.status(500).json({ success: false, error: "Add leave server error" })
    }
}

const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Try to find employee first
        const employee = await Employee.findOne({ 
            $or: [
                { _id: id },
                { user_id: id }
            ]
        });
        
        if (!employee) {
            return res.status(200).json({ success: true, leaves: [] });
        }
        
        // Find leaves for the employee
        const leaves = await Leave.find({ emp_id: employee._id });
        
        return res.status(200).json({ success: true, leaves });
    } catch (err) {
        console.error("Error fetching leaves:", err);
        return res.status(500).json({ success: false, error: 'fetch employee side leaves server error' });
    }
};


const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: 'emp_id',
            populate: [
                {
                    path: 'emp_dept',
                    select: 'dep_name'
                },
                {
                    path: 'user_id',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({ success: true, leaves });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'fetch admin side leaves server error' })
    }
}

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById({_id : id}).populate({
            path: 'emp_id',
            populate: [
                {
                    path: 'emp_dept',
                    select: 'dep_name'
                },
                {
                    path: 'user_id',
                    select: 'name profileImage'
                }
            ]
        })
        return res.status(200).json({ success: true, leave });
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'fetch leave detail server error' })
    }
}

const updateLeave = async(req, res) => {
    try{
        const {id} = req.params
        const leave = await Leave.findByIdAndUpdate({_id : id}, {leave_status: req.body.leave_status})
        if(!leave){
            return res.status(404).json({ success: false, error: 'Leave not found' })
        }
        else{
            return res.status(200).json({ success: true})
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, error: 'leave status update server error' })
    }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave }