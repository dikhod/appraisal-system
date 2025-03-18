const Appraisal = require('../models/Appraisal');
const asyncHandler = require('express-async-handler')

// @desc    Submit appraisal
// @route   POST /api/appraisal/submit
// @access  Admin or Manager

const submitAppraisal = asyncHandler(async (req, res) => {
    const { participantName, performanceScore, comments } = req.body;

    if (!participantName || !performanceScore) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const appraisal = new Appraisal({
        participantName,
        performanceScore,
        comments,
        createdBy: req.user._id // Assuming you have user authentication
    });

    await appraisal.save();
    res.status(201).json({ message: 'Appraisal submitted successfully', appraisal });
});

// @desc    Get appraisals by participant name
// @route   GET /api/appraisal/:participantName
// @access  Admin or Manager
const getAppraisalsByParticipant = asyncHandler(async (req, res) => {
    const { participantName } = req.params;

    if (!participantName) {
        res.status(400);
        throw new Error('Participant name is required.');
    }

    const appraisals = await Appraisal.find({ participantName })
        .populate('createdBy', 'name email'); // Display who submitted the appraisal

    if (!appraisals || appraisals.length === 0) {
        res.status(404);
        throw new Error('No appraisals found for this participant.');
    }

    res.json(appraisals);
});

const getAppraisalsForManager = asyncHandler(async (req, res) => {
    const managerId = req.user?._id; // Assuming you have authentication in place

    const appraisals = await Appraisal.find({ createdBy: managerId })
        .populate('participantId', 'name email');

    if (!appraisals || appraisals.length === 0) {
        res.status(404);
        throw new Error('No appraisals found for this manager.');
    }

    res.json(appraisals);
});

const getAllAppraisals = asyncHandler(async (req, res) => {
    const appraisals = await Appraisal.find().populate('createdBy', 'name email');
    if (!appraisals || appraisals.length === 0) {
        res.status(404);
        throw new Error('No appraisals found.');
    }

    res.json(appraisals);
});


module.exports = { submitAppraisal, getAppraisalsByParticipant, getAppraisalsForManager, getAllAppraisals};
