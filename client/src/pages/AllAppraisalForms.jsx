import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllAppraisalForms = () => {
    const [appraisals, setAppraisals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppraisals = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/appraisal', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Cache-Control': 'no-cache',  //  Prevent caching
                        Pragma: 'no-cache',           //  Extra layer for cache control
                        Expires: '0'                  //  Ensures freshness
                    }
                });
                setAppraisals(response.data);
            } catch (err) {
                console.error('Error fetching appraisals:', err);
                setError(err.response?.data?.message || 'Failed to fetch appraisals');
            } finally {
                setLoading(false);
            }
        };

        fetchAppraisals();
    }, []);
      
    console.log('ui appraisal--->',appraisals);
    if (loading) return <div className="text-center py-10 text-blue-500">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    All Appraisal Forms
                </h2>

                {appraisals.length === 0 ? (
                    <p className="text-center text-gray-500">No appraisals found.</p>
                ) : (
                    <div className="space-y-4">
                        {appraisals.map((appraisal) => (
                            <div
                                key={appraisal._id}
                                className="p-4 border border-blue-300 rounded-md shadow-sm"
                            >
                                <p>
                                    <strong>Participant:</strong> {appraisal.participantName}
                                </p>
                                <p>
                                    <strong>Performance Score:</strong> {appraisal.performanceScore}
                                </p>
                                <p>
                                    <strong>Comments:</strong> {appraisal.comments || 'N/A'}
                                </p>
                                <p>
                                    <strong>Submitted By:</strong> {appraisal.createdBy?.name || 'Unknown'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAppraisalForms;
