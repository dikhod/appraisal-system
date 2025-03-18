import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AppraisalForm = () => {
    const [participantName, setParticipantName] = useState('');
    const [performanceScore, setPerformanceScore] = useState('');
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/api/appraisal/submit', {
                participantName,
                performanceScore,
                comments,
            });
            alert('Appraisal submitted successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting appraisal:', error);
            alert('Failed to submit appraisal.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Appraisal Form</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Participant Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Participant Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter participant name"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Performance Score */}
                    <div>
                        <label className="block text-gray-700 font-medium">Performance Score (Out of 10)</label>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Score (e.g., 8)"
                            min="1"
                            max="10"
                            value={performanceScore}
                            onChange={(e) => setPerformanceScore(e.target.value)}
                            required
                        />
                    </div>

                    {/* Comments Section */}
                    <div>
                        <label className="block text-gray-700 font-medium">Comments</label>
                        <textarea
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Write your comments here..."
                            rows="4"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppraisalForm;
