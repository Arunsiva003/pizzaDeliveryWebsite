import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../components/UserContext';


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
    width: '206vh',
  };

  const bodyStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0',
    background: 'url(./../../assets/images/entry2.jpg)',
    backgroundSize: 'cover',
    overflowX: 'hidden',
  };

  const loginContainerStyle = {
    display: 'flex',
  };

  const loginStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const labelStyle = {
    marginBottom: '5px',
    marginLeft: '20px',
    display: 'flex',
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

  const passwordFieldStyle = {
    position: 'relative',
  };

  const passwordInputStyle = {
    fontSize: '16px',
    marginRight: '10px',
  };

  const togglePasswordStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#888',
  };

  const passwordFieldShowStyle = {
    color: '#333',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    margin: '20px',
    marginLeft: '120px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const registerButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff0000',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  const glassCardStyle = {
    display: 'flex',
    flex: '1',
    position: 'relative',
    height: '400px',
    width: '400px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(7.5px)',
    WebkitBackdropFilter: 'blur(7.5px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    zIndex: '4',
  };

  return (
    <div style={containerStyle}>
      <div style={bodyStyle}>
        <div style={loginContainerStyle}>
          <div style={glassCardStyle}>
            <div style={loginStyle}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" style={labelStyle}>
                  Email
                </label>
                <input
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                />
                <label htmlFor="password" style={labelStyle}>
                  Password
                </label>
                <div
                  className={`password-field ${showPassword ? 'show-password' : ''}`}
                  style={passwordFieldStyle}
                >
                  <input
                    style={Object.assign({}, inputStyle, passwordInputStyle)}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                  />
                  <span
                    className="toggle-password"
                    data-showpassword=""
                    onClick={togglePasswordVisibility}
                    style={Object.assign(
                      {},
                      togglePasswordStyle,
                      showPassword ? passwordFieldShowStyle : null
                    )}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </div>
                <button type="submit" style={buttonStyle}>
                  Log In
                </button>
              </form>
              <button
                style={registerButtonStyle}
                onClick={handleRegisterClick}
              >
                Don't have an account? Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
