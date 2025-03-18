const mongoose = require('mongoose');

const appraisalSchema =  new mongoose.Schema(
    {
        participantName: {
            type: String,
            required: true
        },
        performanceScore: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            default: ''
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

 module.exports = mongoose.model('Appraisal', appraisalSchema);

