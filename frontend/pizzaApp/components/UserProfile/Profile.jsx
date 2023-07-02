import React from 'react';
import u1 from './u1.png';
import u2 from './u2.jpg';
import u3 from './u3.jpg';
import u4 from './u4.jpg';
import u5 from './u5.png';
import u6 from './u6.jpg';
import back from './../../assets/images/bannerimg4.jpg';
import { useNavigate } from 'react-router-dom';
import { RiShoppingCartLine, RiArrowRightSLine } from 'react-icons/ri';
import Navbar from '../Navbar'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const getImages = [u1, u2, u3, u4, u5, u6];
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * getImages.length);
    return getImages[randomIndex];
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    background:`url(${back})`,
    backgroundSize:"cover",
    padding: '20px',
    borderRadius: '10px',
    height:"100vh",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0px 4px 8px rgba(270, 270, 270, 0.5)',
    marginBottom: '20px',
  };

  const infoContainerStyle = {
    width: '100%',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const tableHeaderStyle = {
    backgroundColor: '#ff0800',
    height:'5vh',
    boxShadow:"0px 2px 4px rgb(270,270,270)",
    color: '#ffffff',
    padding: '10px',
    fontSize:'20px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const tableCellStyle = {
    padding: '10px',
    color:'white',
    fontWeight:'bold',
    boxShadow:"0px 2px 4px rgb(270,270,270)",
    borderRadius:'0px 10px 0px 0px',
    borderBottom: '1px solid #ddd',
    fontSize:"20px"
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ff0800',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    marginLeft: '10px',
  };

  const buttonIconStyle = {
    marginRight: '5px',
  };

  return (
    <>
    <Navbar/>
    <div style={containerStyle}>
      {/* <img src={back} alt="Background" style={{ width: '100%', marginBottom: '20px', borderRadius: '10px' }} /> */}

        <img src={getRandomImage()} alt={user.name} style={imageStyle} />
      <div>
        <div style={infoContainerStyle}>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <td style={tableCellStyle}>{user.name}</td>
              </tr>
              <tr>
                <th style={tableHeaderStyle}>Email</th>
                <td style={tableCellStyle}>{user.email}</td>
              </tr>
              <tr>
                <th style={tableHeaderStyle}>Phone Number</th>
                <td style={tableCellStyle}>{user.phoneNumber}</td>
              </tr>
              <tr>
                <th style={tableHeaderStyle}>Address</th>
                <td style={tableCellStyle}>{user.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/usercart')}>
          <RiShoppingCartLine style={buttonIconStyle} />
          My Orders
        </button>
        <button style={buttonStyle} onClick={() => navigate('/menu')}>
          Purchase
          <RiArrowRightSLine style={buttonIconStyle} />
        </button>
      </div>
    </div>
    </>
  );
}

export default Profile;
