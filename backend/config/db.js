const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("db------>",process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
