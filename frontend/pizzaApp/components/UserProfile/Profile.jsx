import React from 'react'
import "./profile.css"
import u1 from "./u1.png";
import u2 from "./u2.jpg";
import u3 from "./u3.jpg";
import u4 from "./u4.jpg";
import u5 from "./u5.png";
import u6 from "./u6.jpg";
import back from "./../../assets/images/slider2.jpg"
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate=useNavigate();
console.log(user)
    const getImages = [
        u1,u2,u3,u4,u5,u6
      ];
      const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * getImages.length);
        return getImages[randomIndex];
      };
  return (
      <div className='userprofile'>
        <img src={back} id="bac"/>
      <div className='profilecard'>
        <div className='div-image'>
        <img src={getRandomImage()} alt={user.name} className='user-image'/>
        </div>
        <div className='div-details'>
            <div className='infou'>
                <h1><span style={{color:"#ff0800",fontSize:"35px"}}>Name</span> : {user.name}</h1>
                <h1><span style={{color:"#ff0800",fontSize:"35px"}}>Email</span> : {user.email}</h1>
                <h1><span style={{color:"#ff0800",fontSize:"35px"}}>Phone Number</span> : {user.phoneNumber}</h1>
                <h1><span style={{color:"#ff0800",fontSize:"35px"}}>Address</span> : {user.address}</h1> 
            </div>
        </div>
        <div className='user-but'>
            <button onClick={()=>{navigate("/usercart")}}>my orders</button>
            <button onClick={()=>{navigate("/menu")}}>purchase</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
