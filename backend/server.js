const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const corsOption = {
    credentials: true,
    // origin: ['http://localhost:5173', 'http://localhost:80']
    origin:'*'
}

app.use(cors(corsOption));
// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appraisal', require('./routes/appraisalRoutes'));

// Database Connection
connectDB();

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
