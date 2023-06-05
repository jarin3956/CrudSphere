import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './ChangePassword.css'

function ChangePassword() {
    const { userId } = useParams();
    const [oldpassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate()
    const goback = () => {
        navigate('/dashboard')
    }

    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3003/api/changepassword/${userId}`, {
                oldpassword,
                password,
                repassword
            });
            const data = response.data
            if (data.status === "success") {
                alert('Password Changed Successfully');
                navigate('/dashboard');
            }else if(data.status === 'usererror'){
                setErrorMessage('Old password didnot match')
            }else if(data.status === 'didnotmatch'){
                setErrorMessage('Reentered password didnot match')
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="App">
            <div className="pass-container">
                <form className="pass-form">
                    <h1 className="pass-title">Change Password</h1>
                    {errorMessage && <p className="pass-error">{errorMessage}</p>}
                    <p className="pass-description">Old Password</p>
                    <input value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} type="password" className="pass-input" placeholder="Old Password" required />
                    <p className="pass-description">New Password</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="pass-input" placeholder="New Password" pattern=".{6,}" title='minimum 6 numbers' required />
                    <p className="pass-description">Re enter Password</p>
                    <input value={repassword} onChange={(e) => setRepassword(e.target.value)} type="password" className="pass-input" placeholder="Confirm Password" required />
                    <br />
                    <input type="submit" value="Save" onClick={changePassword} className="pass-button" />
                    <p className='pass-back-btn' onClick={() => goback()}>Go back</p>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword