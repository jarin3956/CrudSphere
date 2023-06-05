import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';


function Dashboard() {
  const navigate = useNavigate();

  const [user, setUserr] = useState(null);

  const token = localStorage.getItem('token');
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:3003/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data,'---');
          setUserr(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const logOutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login')
  }
  const edit = (e) => {
    e.preventDefault();
    navigate('/edit')
  }
  
  const changePassword = async (userId) => {
    if (userId) {
      navigate(`/changepassword/${userId}`);
    }
  };
  return (
    <div className="dashboard-container">

      {user && (
        <div className="user-info-container">
          <div className="top-bar">
            <div>Welcome {user.username} </div>

            <button className="logoutbutt" onClick={(e) => logOutUser(e)} >Logout</button>

          </div>

          <h2>User Information:</h2>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          {user.image && <img className="user-image" src={`/UserImages/${user.image}`} alt="User" />}
          <button className="edituserbtn" onClick={(e) => edit(e)} >Edit Details</button>
          <button className='changepasswordbtn' onClick={() => changePassword(user._id)}>Change Password</button>
        </div>
      )}


    </div>

  );
}

export default Dashboard;
