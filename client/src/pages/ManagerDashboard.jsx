import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const ManagerDashboard = () => {
    const [appraisals, setAppraisals] = useState([]);

    useEffect(() => {
        const fetchAppraisals = async () => {
            try {
                const response = await api.get('/api/appraisal/manager');
                console.log("appraisal data-->",response.data)
                setAppraisals(response.data);
            } catch (error) {
                console.error('Error fetching appraisals:', error);
            }
        };

        fetchAppraisals();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-indigo-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Manager Dashboard</h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Submitted Appraisals</h3>

                {appraisals.length === 0 ? (
                    <p className="text-center text-gray-500">No appraisals found.</p>
                ) : (
                    <ul className="space-y-4">
                        {appraisals.map((appraisal) => (
                            <li
                                key={appraisal._id}
                                className="bg-indigo-50 p-4 rounded-md shadow-sm flex justify-between items-center"
                            >
                                <span className="font-medium text-indigo-700">
                                    {appraisal.participantId.name}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {appraisal.feedback}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ManagerDashboard;
