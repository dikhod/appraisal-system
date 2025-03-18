const express = require('express');
const {
    assignManager,
    getParticipants,
    getManagers,
    createUser,
    getUsers,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

const router = express.Router();

//  Creating Users
router.post('/create-user', protect, checkRole(['Admin']), createUser);
// get all users
router.get('/users', getUsers);

//  Assigning Managers to Participants
router.post('/assign-manager', protect, checkRole(['Admin']), assignManager);

//  Fetch Participants & Managers
router.get('/participants', protect, checkRole(['Admin']), getParticipants);
router.get('/managers', protect, checkRole(['Admin']), getManagers);

module.exports = router;
