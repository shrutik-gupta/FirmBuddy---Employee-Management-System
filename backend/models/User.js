import mongoose, { Mongoose } from "mongoose"

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    role : {type: String, required: true, enum: ['admin', 'employee']},
    profileImage : {type: String}
});

const User = mongoose.model('User', userSchema);
export default User