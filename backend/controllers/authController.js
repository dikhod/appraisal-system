const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
const registerUser = async (req, res) => {
    console.log("---register-->",req.body);
    const { name, role, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, role, email, password });
    res.status(201).json({ message: 'User registered successfully', token: generateToken(user._id)});
};

// Login User
const loginUser = async (req, res) => {
    const { email, password,role } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', token: generateToken(user._id),role:user.role});
    
};

module.exports = { registerUser, loginUser };
