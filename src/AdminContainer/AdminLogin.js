import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'

import { useContext } from 'react';

function AdminLogin() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  async function loginAdmin(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/admin/api/login', {
        email,
        password,
      });
      const data = response.data;
      if (data.admin) {
        localStorage.setItem('admintoken', data.admin);
        alert('Login Successful');
        navigate('/admindashboard');
      } else if (data.status === 'passworderror') {
        setErrorMessage('Please check the username and password'); // Set the error message
      } else if(data.status === 'error') {
        setErrorMessage('No data found'); // Set the error message
      }
    } catch (error) {
      console.log(error);
    }
  }

  const register = (e) => {
    e.preventDefault();
    navigate('/adminregister')
  }

  return (
    <div className="admin-login-container">
      <form onSubmit={loginAdmin} className="admin-login-form">
        <h1 className="admin-login-title">Admin Login</h1>
        {errorMessage && <p className="admin-login-error">{errorMessage}</p>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="admin-login-input"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="admin-login-input"
        />
        <br />
        <input type="submit" value="Login" className="admin-login-button" />
        <p onClick={(e) => register(e)}>Need to Register?</p>
      </form>
    </div>

  )
}

export default AdminLogin