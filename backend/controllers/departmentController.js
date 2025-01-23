import Department from "../models/Department.js";

const addDepartment = async(req, res)=>{
    try{
        const {dep_name, dep_desc} = req.body;
        const newDepartment = new Department({dep_name, dep_desc});
        await newDepartment.save();
        return res.status(200).json({success: true, department: newDepartment});
    }
    catch(err){
        return res.status(500).json({success: false, error: "add department server error"});
    }
}

const getDepartments = async(req,res)=>{
    try{
        const departments = await Department.find()
        return res.status(200).json({success: true, departments});
    }
    catch(err){
        return res.status(500).json({success: false, error: 'fetch departments server error'})
    }
}

const getDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success: true, department});
    }
    catch(err){
        return res.status(500).json({success: false, error: "get department server error"});
    }
}

const editDepartment = async(req,res)=>{
    try{
        const {dep_name, dep_desc} = req.body;
        const {id} = req.params;
        const updatedDepartment = await Department.findByIdAndUpdate({_id: id}, {dep_name, dep_desc})
        return res.status(200).json({success: true, department: updatedDepartment});
    }
    catch(err){
        return res.status(500).json({success: false, error: "edit department server error"});
    }
}

const deleteDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedDept = await Department.findById({_id:id});
        await deletedDept.deleteOne();
        return res.status(200).json({success: true, department: deletedDept});
    }
    catch(err){
        return res.status(500).json({success: false, error: "delete department server error"});
    }
}

export {addDepartment, getDepartments, getDepartment, editDepartment, deleteDepartment}