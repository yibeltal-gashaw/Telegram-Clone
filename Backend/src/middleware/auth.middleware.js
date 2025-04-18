import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const haveToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, No token provided' });
    }
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValidToken) {
        return res.status(401).json({ message: 'Unauthorized, Invalid token' });
    }
    try {
        const user = await User.findById(isValidToken.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            type: error.name,
            message: error.message
        });
    }
}