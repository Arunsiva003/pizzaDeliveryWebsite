import React, { useState,useContext,useEffect } from 'react';
import './adminlogin.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from './AdminAuthContext';

const AdminLogin = () => {
  const history=useNavigate();
  const [formDatas, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setmessage]=useState("")
  const { isadminauth, setisadminauth } = useContext(AdminAuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:3001/admin/login", {
        email: formDatas.email,
        password: formDatas.password,
      });
  
      const data = res.data;
      console.log(data)
      if (res.data.message === "Login success") {
        setisadminauth(true);
        setmessage("Login Success");
        history("/admin");
      } else if (res.data.message === "User not found, please sign up") {
        setmessage("User not found, please sign up");
        console.log(res.data);
        setTimeout(() => {
          setmessage(""); 
        }, 2000);
      } else if (res.data.message === "Invalid email or password") {
        setmessage("Invalid email or password");
        console.log(res.data);
        setTimeout(() => {
          setmessage("");
        }, 2000);
      }
      else{
        setmessage(res.data.message)
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(isadminauth,"form login"); 
  
  return (
    <div className='form-container'>
      {message && (
              <div className="notification">
                <h3>{message}</h3>
              </div>
      )} 
      <div className="form-admin">
        
      <div className="form-inner-admin">
        
        <h2 className='admin-text'>Admin Login</h2>
        <div className="input-wrapper">
          <label style={{color:"white"}}>Email:</label>
          <div className="input-group">
              <img className="icon-admin" src='./../icons/email.png'/>
            <input className='input-admin'
              type="email"
              name="email"
              value={formDatas.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label style={{color:"white"}}>Password:</label>
          <div className="input-group">
            <img className="icon-admin" src='./../icons/password.png'/>
            <input
            className='input-admin'
              type="password"
              name="password"
              value={formDatas.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn--primary login-form-admin" onClick={handleLogin}>Login</button>
        </div>
        {/* <h2>for testing purpose</h2>
        <h3>email:admin@gmail.com
            password:admin1234
        </h3> */}
      </div>
      </div>
    </div>
  );
};

export default AdminLogin;
