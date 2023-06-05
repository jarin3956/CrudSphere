import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminRegister.css'

function AdminRegister() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  async function registerAdmin(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/admin/api/register', {
        name,
        email,
        password,
        repassword
      });
      const data = response.data;
      if (data.status === 'ok') {
        navigate('/adminlogin');
      } else if (data.status === 'incorrectpassword') {
        alert('Password Does Not Match')
      } else {
        alert('Cannot Register')
      }
    } catch (error) {
      console.log(error);
    }
  }
  const existing = (e) => {
    e.preventDefault();
    navigate('/adminlogin')
  }

  return (
    <div className="App">
      <div className="admin-register-container">
        <form onSubmit={registerAdmin} className="admin-register-form">
          <h1 className="admin-register-title">Admin Register</h1>
          <p className="admin-register-description">Please fill in the following details:</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="admin-register-input"
            placeholder="Name"
            pattern="^[A-Za-z]+$" title='provide a valid name only with a-z' required
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="admin-register-input"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title='not a valid email format' required
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="admin-register-input"
            placeholder="Password"
            pattern=".{6,}" title='minimum 6 numbers' required
          />
          <br />
          <input
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            type="password"
            className="admin-register-input"
            placeholder="Password Confirm"
            required
          />
          <br />
          <input type="submit" value="Register" className="admin-register-button" />
          <p onClick={(e) => existing(e)}>Need to login?</p>
        </form>
      </div>
    </div>



  )
}

export default AdminRegister