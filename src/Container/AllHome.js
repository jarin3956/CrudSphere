import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AllHome.css'

function AllHome() {
    const navigate = useNavigate()
    const usersLogin = (e) =>{
        e.preventDefault()
        navigate('/login')
    }
    const adminsLogin = (e) =>{
        e.preventDefault()
        navigate('/adminlogin')
    }
  return (
    <div className='allhome'>
        <h1 className='allhometitle' >All home</h1>
        <p className='allhomeuser' onClick={(e) => usersLogin(e)} >User Login</p>
        <p className='allhomeadmin' onClick={(e) => adminsLogin(e)} >Admin Login</p>
    </div>
  )
}

export default AllHome