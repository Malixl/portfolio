const mongoose = require('mongoose');

let isConnected = false;

mongoose.set('strictQuery', true);

const connectDB = async () => {
    if (isConnected) {
        console.log('📦 Using existing MongoDB connection');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
        });

        isConnected = conn.connections[0].readyState === 1;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
