import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const login =  async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({success: false, error: 'User Not found'})
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                res.status(404).json({success: false, error: 'Wrong password'})     
            }
            else{
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY, {expiresIn: '1d'})
                res.status(200).json({success: true, token, user: {_id: user._id, name: user.name, role: user.role}})
            }
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({success: false, error: e.message})
    }
}

const verify = (req,res)=>{
    return res.status(200).json({success: true, user: req.user});
}

export {login, verify}