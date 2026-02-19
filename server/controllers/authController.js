const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Please provide username and password' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        // Return user data with token
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Please provide username and password' });
        }

        // Find user by username
        const user = await User.findOne({ username });

        // Check user and compare password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    token: generateToken(user._id),
                },
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
