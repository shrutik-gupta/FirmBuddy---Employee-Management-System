import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const verifyUser = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(404).json({success: false, message: 'Token is required'})
        }
        else{
            const decoded = jwt.verify(token,process.env.JWT_KEY) //is token valid?
            if(!decoded){
                return res.status(404).json({success: false, message: 'Token invalid'})
            }
            else{
                const user = await User.findById({_id: decoded._id}).select('-password')
                if(!user){
                    return res.status(404).json({success: false, message: 'User not found'})
                }
                else{
                    req.user = user
                    next()
                }
            }
        }
    }
    catch(error){
        return res.status(404).json({success: false, message: 'Server error'})
    }
}

export default verifyUser;