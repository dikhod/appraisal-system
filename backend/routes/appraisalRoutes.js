const express = require('express');
const { submitAppraisal, getAppraisalsByParticipant, getAppraisalsForManager, getAllAppraisals } = require('../controllers/appraisalController');
const { protect } = require('../middleware/authMiddleware');
const {checkRole} = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/submit', protect, checkRole(['Participant','Manager']), submitAppraisal);
router.get('/:participantId',checkRole(['Participant','Manager','Admin']), protect, getAppraisalsByParticipant);
router.get('/manager', protect, checkRole(['Manager']), getAppraisalsForManager);
router.get('/', protect, checkRole(['Admin', 'Manager']), getAllAppraisals);

module.exports = router;
