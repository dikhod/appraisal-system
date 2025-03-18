const User = require('../models/User');

const createUser = async (req, res) => {
    const { name, role, email, password } = req.body;

    const user = new User({ name, role, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
};

// Get All Users (Admin, Manager, Participant)
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getParticipants = async (req, res) => {
    const participants = await User.find({ role: 'Participant' });
    res.json(participants);
};

const getManagers = async (req, res) => {
    const managers = await User.find({ role: 'Manager' });
    res.json(managers);
};

const assignManager = async (req, res) => {
    const { participantId, managerId } = req.body;

    const participant = await User.findById(participantId);
    const manager = await User.findById(managerId);

    if (!participant || !manager || manager.role !== 'Manager') {
        return res.status(404).json({ message: 'Invalid participant or manager ID' });
    }

    participant.managerId = managerId;
    await participant.save();

    res.json({ message: `Manager assigned successfully to ${participant.name}` });
};



module.exports = { createUser,getUsers,assignManager, getParticipants, getManagers};
