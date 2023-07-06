import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye } from 'react-icons/fa';
import loginBackground from '../../assets/images/login3.jpg';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setaddress] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("hello")
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password,
        phoneNumber,address,
      })
      
      res.data && window.location.replace("/")
    } catch (error) {
      console.log({error})
  };
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  const containerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: 'cover',
    overflowX: 'hidden',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection:'column',
    flex: 1,
    margin: '20px',
    padding:'10px',
    position: 'fixed',
    height: '75%',
    width: '400px',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(7.5px)',
    WebkitBackdropFilter: 'blur(7.5px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    zIndex: 4,
  };

  const inputStyle = {
    width: '300px',
    padding: '10px',
    marginLeft: '20px',
    marginBottom: '15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff9800',
    color: '#fff',
    margin: '20px',
    marginLeft: '120px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const loginButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff0000',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  const titleStyle = {
    margin: '10px',
    fontSize: '34px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
      <h2 style={titleStyle}>Register</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" style={{ marginBottom: '5px', marginLeft: '20px', display: 'flex',color:'white' }}>
              Name
            </label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              required
            />
            <label htmlFor="email" style={{ marginBottom: '5px', marginLeft: '20px', display: 'flex',color:'white' }}>
              Email
            </label>
            <input
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              required
            />
            <label htmlFor="password" style={{ marginBottom: '5px', marginLeft: '20px', display: 'flex',color:'white' }}>
              Password
            </label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
            <label htmlFor="phoneNumber" style={{ marginBottom: '5px', marginLeft: '20px', display: 'flex',color:'white' }}>
              Phone Number
            </label>
            <input
              style={inputStyle}
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Your phoneNumber number"
            />
            <label htmlFor="address" style={{ marginBottom: '5px', marginLeft: '20px', display: 'flex',color:'white' }}>
              Address
            </label>
            <input
              style={inputStyle}
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Your address"
            />
            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
          <button className="login-button" onClick={handleLoginClick} style={loginButtonStyle}>
            Already have an account? Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
