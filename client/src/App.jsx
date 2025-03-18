import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AppraisalForm from './pages/AppraisalForm';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AllAppraisalForms from './pages/AllAppraisalForms';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
  
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="manager" element={<ManagerDashboard />} />
                    <Route path="appraisal" element={<AppraisalForm />} />
                    <Route path="allappraisals" element={<AllAppraisalForms/>}/>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
