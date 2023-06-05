import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './register.css'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [image, setImage] = useState(null)

    async function registerUser(event) {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('repassword', repassword);
            formData.append('image', image);
            const response = await axios.post('http://localhost:3003/api/register', formData);
            const data = response.data;
            if (data.status === 'ok') {
                navigate('/login');
            } else if (data.status === 'incorrectpassword') {
                alert('Password does not match')
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    const existing = (e) => {
        e.preventDefault();
        navigate('/login')
      }
    return (
        <div className="App">
            <div className="register-container">
                <form onSubmit={registerUser} encType="multipart/form-data" className="register-form">
                    <h1 className="register-title">Register</h1>
                    <p className="register-description">Please fill in the following details:</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="register-input" placeholder="Name" pattern="^[A-Za-z]+$" title='provide a valid name only with a-z' required />
                    <br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="register-input" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title='not a valid email format' required />
                    <br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="register-input" placeholder="Password" pattern=".{6,}" title='minimum 6 numbers' required />
                    <br />
                    <input value={repassword} onChange={(e) => setRepassword(e.target.value)} type="password" className="register-input" placeholder="Confirm Password" required/>
                    <br />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="register-file-input" required/>
                    <br />
                    <input type="submit" value="Register" className="register-button" />
                     <p onClick={(e) => existing(e)}>Already a user?</p>
                </form>
            </div>
        </div>

    )
}

export default Register