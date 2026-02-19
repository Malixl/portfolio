const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Protect routes - verify JWT token
const protect = async (req, res, next) => {
    let token;

    try {
        // Check for Bearer token in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } else {
            res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
