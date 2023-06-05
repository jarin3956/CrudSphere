import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeUserCredentials } from '../Redux- toolkit/authslice'


function EditUser() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userIdEdit, setUserIdEdit] = useState(null); // Use useState to create mutable userIdEdit
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/admin/api/changeData/${user}`);
      console.log(response.data);
      const data = response.data;
      setName(data.name);
      setEmail(data.email);
      setUserIdEdit(data.user_id); // Update userIdEdit value
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (e,id, name, email) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3003/admin/api/saveUser/${id}`, { name, email });
      if (response) {
        dispatch(removeUserCredentials());
        navigate('/usertable')
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const goback = (e) => {
    e.preventDefault();
    navigate('/usertable')
  }

  return (
    <div className="App">
      <div className="edit-container">
        <form encType="multipart/form-data" className="edit-form">
          <h1 className="edit-title">Edit Details</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="edit-input"
            placeholder="Name"
            pattern="^[A-Za-z]+$"
            title="provide a valid name only with a-z"
            required
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="edit-input"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="not a valid email format"
            required
          />
          <br />
          <input
            type="submit"
            value="Save"
            onClick={(e) => saveUser(e,userIdEdit, name, email)}
            className="edit-but"
          />
          <p className='editad-back-btn' onClick={(e)=>goback(e)} >Go back</p>
        </form>
      </div>
      </div>
  );
}

export default EditUser;
