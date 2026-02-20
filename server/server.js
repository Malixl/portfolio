const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();

// ===================== CORS =====================
// Must be the FIRST middleware so headers are set even on error responses
const corsOptions = {
    origin: true, // Reflects request origin (compatible with credentials: true)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ===================== Security Headers =====================
app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
}));

// ===================== Body Parser =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== Rate Limiting =====================
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
// app.use('/api', limiter);

// ===================== Database Middleware (Serverless) =====================
// Await DB connection BEFORE any route handler runs
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// ===================== API Routes =====================
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Health check / test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Debug route
app.get('/debug', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        message: 'Debug Info',
        method: req.method,
        url: req.url,
        dbState: mongoose.connection.readyState,
        env: process.env.NODE_ENV,
    });
});

// ===================== Start Server =====================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

module.exports = app;
