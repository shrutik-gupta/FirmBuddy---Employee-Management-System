import User from "../models/User.js";
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try {
        const { user_id, old_password, new_password } = req.body;
        const user = await User.findById({_id : user_id});
        if(!user){
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        else{
            const isMatch = await bcrypt.compare(old_password, user.password);
            if(!isMatch){
                return res.status(401).json({ success: false, error: 'Old password is incorrect' })
            }
            else{
                const hashedPassword = await bcrypt.hash(new_password, 10)
                const newUser = await User.findByIdAndUpdate({_id: user_id}, {password: hashedPassword})
                return res.status(200).json({ success: true, message: 'Password changed successfully' })
            }
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, error: 'Change password server error' })
    }
}
export { changePassword }