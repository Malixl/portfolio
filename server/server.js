const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// 1. Enable CORS first to handle preflight requests
// Vercel debugging: Allow ALL origins temporarily to rule out CORS issues
app.use(cors({
    origin: 'https://lixportfolio.vercel.app', // Ubah dari '*' menjadi true (agar otomatis mendeteksi domain frontend)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Set Security Headers
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// 3. Body Parser (Must be before sanitization)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Data Sanitization against NoSQL query injection
// app.use(mongoSanitize());

// 5. Data Sanitization against XSS
// app.use(xss());

// 6. Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
// app.use('/api', limiter);

// API Routes
const apiRoutes = require('./routes/apiRoutes');
app.options('*', cors()); // Enable pre-flight for all routes
// Handle routes on both /api (local) and / (Vercel potentially stripping prefix)
app.use(['/api', '/'], apiRoutes);

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Debug Route for Vercel
app.all('/debug', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        message: 'Debug Info',
        method: req.method,
        url: req.url,
        dbState: mongoose.connection.readyState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        env: process.env.NODE_ENV
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

// Export app for Vercel
module.exports = app;
