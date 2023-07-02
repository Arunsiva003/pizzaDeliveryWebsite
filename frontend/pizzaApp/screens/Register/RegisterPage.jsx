import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
}

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        background: 'url("./../../assets/images/entry2.jpg")',
        backgroundSize: 'cover',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          margin:"30px",
          position: 'fixed',
          height: '400px',
          width: '400px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(7.5px)',
          WebkitBackdropFilter: 'blur(7.5px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              style={{
                marginBottom: '5px',
                marginLeft: '20px',
                display: 'flex',
              }}
            >
              Name
            </label>
            <input
              style={{
                width: '300px',
                padding: '10px',
                marginLeft: '20px',
                marginBottom: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name" required
            />
            <label
              htmlFor="email"
              style={{
                marginBottom: '5px',
                marginLeft: '20px',
                display: 'flex',
              }}
            >
              Email
            </label>
            <input
              style={{
                width: '300px',
                padding: '10px',
                marginLeft: '20px',
                marginBottom: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email" required
            />
            <label
              htmlFor="password"
              style={{
                marginBottom: '5px',
                marginLeft: '20px',
                display: 'flex',
              }}
            >
              Password
            </label>
            <input
              style={{
                width: '300px',
                padding: '10px',
                marginLeft: '20px',
                marginBottom: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password" required
            />
            <label
              htmlFor="phoneNumber"
              style={{
                marginBottom: '5px',
                marginLeft: '20px',
                display: 'flex',
              }}
            >
              Phone Number
            </label>
            <input
              style={{
                width: '300px',
                padding: '10px',
                marginLeft: '20px',
                marginBottom: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Your phoneNumber number"
            />
            <label
              htmlFor="address"
              style={{
                marginBottom: '5px',
                marginLeft: '20px',
                display: 'flex',
              }}
            >
              Address
            </label>
            <input
              style={{
                width: '300px',
                padding: '10px',
                marginLeft: '20px',
                marginBottom: '15px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Your address"
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                margin: '20px',
                marginLeft: '120px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
          </form>
          <button
            className="login-button"
            onClick={handleLoginClick}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ff0000',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Already have an account? Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
