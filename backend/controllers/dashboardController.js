import Employee from "../models/Employee.js"
import Department from "../models/Department.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalDepartments = await Department.countDocuments();
        const totalSalaries = await Employee.aggregate([
            {
                $group: {
                    _id: null, totalSalary: { $sum: '$emp_salary' }
                }
            }
        ])
        const empAppliedForLeave = await Leave.distinct('emp_id')
        const leaveStatus = await Leave.aggregate([
            {
                $group: {
                    _id: '$leave_status', // _id is required in MongoDB group stage
                    count: { $sum: 1 },
                },
            },
        ]);

        const leaveSummary = {
            applied: empAppliedForLeave.length,
            approved: leaveStatus.find((item) => item._id === 'Approved')?.count || 0,
            rejected: leaveStatus.find((item) => item._id === 'Rejected')?.count || 0,
            pending: leaveStatus.find((item) => item._id === 'Pending')?.count || 0,
        };


        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalaries: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'dashboard summary server error' })
    }
}

export { getSummary }