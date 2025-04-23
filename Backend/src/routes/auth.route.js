import express from 'express';
const router = express.Router();
import {Register,Login,Logout,VerifyEmail,
    ResetPassword,ForgotPassword,UpdateProfile,
    checkAuth
} from '../controller/auth.controller.js';
import {body}  from 'express-validator';
import {haveToken} from '../middleware/auth.middleware.js';

// User input validation middleware with express-validator
const validate = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('fullname')
    .notEmpty().withMessage('Full name is required'),
    body('email')
    .notEmpty().withMessage('Email is required').
    isEmail().withMessage('Invalid email address'),
   
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .isStrongPassword().withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
]
// Register a new user
router.post('/signup',validate,Register);

// Login a user
router.post('/login',Login);

// Logout a user
router.post('/logout',Logout);

// Verify a user's email
router.get('/verify/:token',VerifyEmail);

// Send a password reset email
router.post('/forgot-password',ForgotPassword);

// Reset a user's password
router.post('/reset-password/:token',ResetPassword);

// update user profile
router.put('/update-profile',haveToken,UpdateProfile);
router.get('/check',haveToken,checkAuth);

export default router;