import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    isVerified: { type: Boolean, default: false }, 
},
    {
        timestamps: true
    }
)

// Encrypt password before saving to database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Compare password with hashed password in database during login
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;