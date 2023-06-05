import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './UserTable.css'
import { useDispatch } from 'react-redux';
import { addUserCredentials } from '../Redux- toolkit/authslice';

function UserTable() {

    const navigate = useNavigate()

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3003/admin/api/userdetails');
            const data = response.data;
            setUsers(data);
            if (filteredUsers.length > 0) {
                const searchText = document.querySelector('.search-bar').value.toLowerCase();
                const filteredData = data.filter((user) => {
                    const nameMatch = user.name.toLowerCase().includes(searchText);
                    const emailMatch = user.email.toLowerCase().includes(searchText);
                    return nameMatch || emailMatch;
                });
                setFilteredUsers(filteredData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const changeStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3003/admin/api/changeStatus/${id}`);
            const updatedUser = response.data;
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
            );
            setFilteredUsers((prevFilteredUsers) =>
                prevFilteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3003/admin/api/deleteUser/${id}`);
            if (response.status === 200) {
                alert("User deleted")
            }
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            if (filteredUsers.length > 0) {
                setFilteredUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const dispatch = useDispatch();

    const handleGoBack = () => {
        navigate('/admindashboard')
    };
    const handleEditUser = async (user) => {
        if (user) {
            dispatch(addUserCredentials(user));
            navigate('/edituser')
        }
    };
    const addUser = () => {
        navigate('/adduser')
    }
    const [filteredUsers, setFilteredUsers] = useState([]);
    const handleSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        if (searchText.trim() === '') {
            setFilteredUsers([]);
        } else {
            const filteredUsers = users.filter((user) => {
                const nameMatch = user.name.toLowerCase().includes(searchText);
                const emailMatch = user.email.toLowerCase().includes(searchText);
                return nameMatch || emailMatch;
            });
            setFilteredUsers(filteredUsers);
        }
    };

    return (
        <div className="user-table-container">
            <p className='adminsusertitle'>User Table</p>
            <div className="search-add-container">
                <button className="back-button" onClick={handleGoBack}>Back</button>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search User"
                    onChange={handleSearch}
                />
                <button className="add-button" onClick={addUser}>Add User</button>
            </div>
            <br />
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredUsers.length > 0 ? (

                        filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className={user.status ? 'user-status-blocked' : 'user-status-active'}>
                                    {user.status ? 'Blocked' : 'Active'}
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditUser(user._id)}>
                                        Edit
                                    </button>
                                    <button className="u-button" onClick={() => changeStatus(user._id)}>
                                        {user.status ? 'Unblock' : 'Block'}
                                    </button>
                                    <button className="delete-button" onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className={user.status ? 'user-status-blocked' : 'user-status-active'}>
                                    {user.status ? 'Blocked' : 'Active'}
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditUser(user._id)}>
                                        Edit
                                    </button>
                                    <button className="u-button" onClick={() => changeStatus(user._id)}>
                                        {user.status ? 'Unblock' : 'Block'}
                                    </button>
                                    <button className="delete-button" onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}

                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
