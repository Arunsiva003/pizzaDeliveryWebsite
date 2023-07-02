import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../components/UserContext';
import { FaEnvelope, FaLock,FaEye } from 'react-icons/fa';
import loginBackground from '../../assets/images/login3.jpg';


const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { updateName } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const { user } = responseData;
      console.log("login user data:",user)

      updateName(user.name);

      localStorage.setItem('user', JSON.stringify(user));
      // Successful login
      window.location.href = '/home'
    } else {
      const errorData = await response.json();
      console.log('Login error:', errorData.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: 'cover',
  };
  

  const cardStyle = {
    width: '400px',
    padding: '40px',
    borderRadius: '10px',
    height:'60%',
    background: 'rgba(0,0,0,0.4)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    margin: '30px',
    padding:'10px',
    fontSize: '34px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '10px',
    background: '#f1f1f1',
    borderRadius: '5px',
  };

  const inputIconStyle = {
    marginRight: '10px',
    color: '#888',
  };

  const inputStyle = {
    flex: '1',
    padding: '10px',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    color: '#333',
    fontSize: '16px',
  };

  const passwordToggleStyle = {
    cursor: 'pointer',
    color: '#888',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '30%',
    marginTop: '20px',
    marginLeft: '30%',
    marginRight: 'auto',
  };
  

  const registerButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'blue',
    fontWeight:"bold",
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    textAlign: 'center',
    marginLeft: '15%',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <FaEnvelope style={inputIconStyle} />
            <input
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email..."
            />
          </div>
          <div style={inputContainerStyle}>
            <FaLock style={inputIconStyle} />
            <input
              style={inputStyle}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <FaEye
              style={passwordToggleStyle}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Log In
          </button>
        </form>
        <button style={registerButtonStyle} onClick={handleRegisterClick}>
          Don't have an account? Register Here
        </button>
      </div>
    </div>
  );
};

export default LoginPage;