import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useContext } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); // Move useNavigate outside of the loginUser function
  
  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/api/login', {
        email,
        password,
      });
      const data = response.data;
      console.log(data,'1222555')
      
      if (data.status === 'userblocked') {
        setErrorMessage('You are blocked by admin');
      }
      else if (data.user) {
        localStorage.setItem('token', data.user);
        alert('Login Successful');
        navigate('/dashboard'); // Use navigate from the outer scope

      }
      else if(data.status === "usernotfound") {
        setErrorMessage('no data found');
      }else if(data.status === 'passworderror'){
        setErrorMessage('Please check the username and password');

      }
    } catch (error) {
      console.log(error,'errrrrrrrrrrrrrrrrrrrr');
    }
  }
  const register = (e) => {
    e.preventDefault();
    navigate('/register')
  }
  
  return (
    <div className="login-container">
      
      <form onSubmit={loginUser} className="login-form">
      <h1>User Login</h1>
      {errorMessage && <p className="admin-login-error">{errorMessage}</p>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <input type="submit" value="Login" className="login-button" />
        <p onClick={(e) => register(e)}>Need to Register?</p>
      </form>
    </div>
  );
}

export default Login;
