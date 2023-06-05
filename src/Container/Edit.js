import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Edit.css'

function Edit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3003/api/editdetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { name, email, user_id, image } = res.data;
        setName(name);
        setEmail(email);
        setUserId(user_id);
        setImage(image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const saveUser = async (e, userId, name, email, image) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(
        `http://localhost:3003/api/saveUser/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const goback = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  }


  return (
    <div className="App">
      <div className="user-editcont">
        <form className="user-editform">
          <h1 className="user-edittitle">Edit Data</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="user-editinput"
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
            className="user-editinput"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="not a valid email format"
            required
          />
          <br />
          {image && (
            <img
              src={`/UserImages/${image}`}
              alt=""
              style={{ width: '100px', height: '100px' }}
            />
          )}
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="register-file-input"
          />
          <br />
          <input
            type="submit"
            onClick={(e) => saveUser(e, userId, name, email, image)}
            value="Save"
            className="user-editbtn"
          />
          <p className='edit-back-btn' onClick={(e)=>goback(e)} >Go back</p>
        </form>
      </div>
    </div>
  );
}

export default Edit;
