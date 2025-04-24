import {validationResult} from 'express-validator';
import User from '../models/user.model.js';
import {generateToken} from '../lib/utils.js';
import {cloudinary} from '../lib/cloudinary.js';

export const Register = async (req, res) => {
    const {email, password, fullname, username} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg
        }))
        
        return res.status(400).json({errors: errorMessages})
    }
    try {
        // Create a new user
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                field: 'email',
                message: 'Email is already registered'
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                field: 'username',
                message: 'Username is already taken'
            });
        }

        // create user
        const newUser = new User({
            username,
            fullname,
            email,
            password
        });
        if(newUser){
            /// generate token
           const token =  generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                code: 201,
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullname: newUser.fullname,
                profilePicture: newUser.profilePicture,
                isVerified: newUser.isVerified,
                token: token,
                msg: 'User created successfully'
            });
        }
        else{
            res.status(400).json({message: 'Invalid user data'});
        }

    } catch (error) {
        res.status(500).json({type: error.name, message: error.message});
    }
    // Create a new user
}

export const Login = async (req, res) => {
    const {email, password} = req.body;
   try{
    // check if user exists
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            field: 'email',
            message: 'Invalid credentials, please try again!'
        });
    }
    // check if password is correct
    const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({
                field: 'password',
                message: 'Invalid credentials, please try again!'
            });
        }
        const token = generateToken(user._id, res);
    
        return res.status(200).json({
        code: 200,
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        token: token,
        msg: "User logged in successfully"
    });

   }catch(error){
    res.status(500).json({type: error.name, message: error.message});
   }

}
export const Logout = (req, res) => {
    try {
        // Clear the auth cookie with same options used when setting it
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            type: error.name,
            message: error.message
        });
    }
};


export const VerifyEmail = async (req, res) => {
    // Verify a user's email
}

export const ForgotPassword = async (req, res) => {
    // Send a password reset email
}
export const ResetPassword = async (req, res) => {
    // Reset a user's password
}

export const UpdateProfile = async (req, res) => {
    // Update a user's profile

    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;
        if(!profilePicture){
            return res.status(400).json({
                field: 'profilePicture',
                message: 'Profile picture is required'
            });
        }
        const uploadpath = await cloudinary.uploader.upload(profilePicture, {
            folder: 'users',
          });
        const updateduser = await User.findByIdAndUpdate(userId, {profilePicture: uploadpath.secure_url},{new: true});
        return res.status(200).json(updateduser);
        
    } catch (error) {
        res.status(500).json({type: error.name, message: error.message});
        
    }
}

export const checkAuth = async (req, res) => {
    // Check if a user is authenticated
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({type: error.name, message: error.message});
    }
}