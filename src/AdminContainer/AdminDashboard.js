import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css'

function AdminDashboard() {
    
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    const admintoken = localStorage.getItem('admintoken');
    console.log(admintoken);
    useEffect(() => {
        if (!admintoken) {
            // If token doesn't exist, redirect to login
            navigate('/adminlogin');
        } else {
            // Token exists, validate it

            axios.get('http://localhost:3003/admin/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${admintoken}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    setAdmin(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const logoutAdmin = (e) => {
        e.preventDefault();
        
        localStorage.removeItem('admintoken')
        navigate('/adminlogin')
    }
    const userTable = (e) => {
        e.preventDefault();
        navigate('/usertable')
    }
    return (
        <div className="admin-dashboard-container">
            <div className="welcome-bar">
                <span>Welcome, Admin</span>
            </div>
            <h1>Welcome to Admin Dashboard</h1>
            {admin && (
                <div className="admin-info">
                    <h2>Admin Information:</h2>
                    <p>Name: {admin.name}</p>
                    <p>Email: {admin.email}</p>
                    <button onClick={(e) => logoutAdmin(e)}>Logout</button>
                    <button onClick={(e) => userTable(e)}>Users</button>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard