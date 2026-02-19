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
// Vercel deployment: use environment variable for production, allow localhost for dev
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
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
app.use('/api', apiRoutes);

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
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
