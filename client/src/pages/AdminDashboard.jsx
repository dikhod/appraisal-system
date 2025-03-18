import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, participantsRes, managersRes] = await Promise.all([
                    api.get('/api/admin/users'),
                    api.get('/api/admin/participants'),
                    api.get('/api/admin/managers')
                ]);
                setUsers(usersRes.data);
                setParticipants(participantsRes.data);
                setManagers(managersRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const assignManager = async (participantId) => {
        if (!selectedManager[participantId]) {
            alert('Please select a manager before assigning.');
            return;
        }

        try {
            await api.post('/api/admin/assign-manager', {
                participantId,
                managerId: selectedManager[participantId]
            });
            alert('Manager assigned successfully!');
        } catch (error) {
            console.error('Error assigning manager:', error);
            alert('Failed to assign manager.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h2>

                {/* All Users */}
                <h3 className="text-xl font-semibold text-gray-700">All Users</h3>
                <ul className="bg-blue-50 p-4 rounded-md shadow-sm mb-6">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="p-2 border-b border-blue-200 last:border-none"
                        >
                            {user.name} - <span className="font-medium text-blue-500">{user.role}</span>
                        </li>
                    ))}
                </ul>

                {/* Assign Managers to Participants */}
                <h3 className="text-xl font-semibold text-gray-700">Assign Managers to Participants</h3>
                <ul className="bg-green-50 p-4 rounded-md shadow-sm">
                    {participants.map((participant) => (
                        <li
                            key={participant._id}
                            className="flex items-center gap-4 p-2 border-b border-green-200 last:border-none"
                        >
                            <span className="flex-1">{participant.name}</span>
                            <select
                                value={selectedManager[participant._id] || ''}
                                onChange={(e) =>
                                    setSelectedManager({
                                        ...selectedManager,
                                        [participant._id]: e.target.value
                                    })
                                }
                                className="p-2 border rounded-md"
                            >
                                <option value="">Select Manager</option>
                                {managers.map((manager) => (
                                    <option key={manager._id} value={manager._id}>
                                        {manager.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => assignManager(participant._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                                Assign
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
