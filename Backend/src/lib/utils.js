import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    // Generate a JWT token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});

    // Set the token as a cookie
    res.cookie('token', token,{
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent xss attacks 
        sameSte: 'strict', // prevent csrf attacks
        secure: process.env.NODE_ENV !== 'development',
    })
 return token;
}