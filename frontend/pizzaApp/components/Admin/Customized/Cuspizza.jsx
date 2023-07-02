import React from 'react';
import './custompizza.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

function Cuspizza() {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.name);
  const [foods, setFoods] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const getImages = [
    "./../../../assets/images/img/pizza2.jpg",
    "./../../../assets/images/img/pizza3.jpg",
    "./../../../assets/images/img/pizza4.jpg",
    "./../../../assets/images/img/pizza5.jpg",
    "./../../../assets/images/img/pizza6.jpg"
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/customizedpizzaadmin");
      setFoods(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gridGap: '20px',
    marginTop: '20px',
  };

  const foodItemStyle = {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const foodItemImageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  const foodItemNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const foodItemDescriptionStyle = {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#666',
  };

  const foodItemPriceStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ff5722',
  };

  const buttonStyle = {
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonIconStyle = {
    marginRight: '5px',
  };

  const navigate = useNavigate();

  const handleFoodItemClick = (food) => {
    // Handle click event for a food item
  };

  const handleViewMoreClick = (food) => {
    // Handle click event for the "View More" button
    navigate(`/singlepizza/${food._id}`);
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * getImages.length);
    return getImages[randomIndex];
  };

  const handleRemove = (ord) => {
    axios
      .post(`http://localhost:3001/admin/clearpizzacus/${ord._id}`)
      .then((res) => {
        
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        window.location.reload();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize:"30px" }}>
        <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',borderBottom:"2px dotted red" }}>Customized Pizza</h2>
        <Link to="/usercart" style={{ textDecoration: 'none', color: '#000' }}>
          
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {message && <h1 style={{ backgroundColor: "#90EE90", width: "fit-content", padding: "7px", borderRadius: "10px", textTransform: "capitalize", position: "sticky", top: "30%" }}>{message} ✅</h1>}
      </div>
      <div style={gridContainerStyle}>
        {
        foods.length !=0 ?
        foods.map((food) => (
          <div key={food._id} style={foodItemStyle} onClick={() => handleFoodItemClick(food)}>
            <img src={getRandomImage()} alt={food.name} style={foodItemImageStyle} />
            <h3 style={foodItemNameStyle}>{food.name}</h3>
            <p style={foodItemDescriptionStyle}>{food.description}</p>
            <p style={foodItemPriceStyle}>Price: ${food.price}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around',flexDirection:"column" }}>
                <div className='additon'>
                <h2><span style={{color:"black"}}>Base:</span>{food.base}</h2>
                <h2><span style={{color:"black"}}>Sauce:</span>{food.sauce}</h2>
                <h2><span style={{color:"black"}}>Cheese:</span>{food.cheese}</h2>
                <h2><span style={{color:"black"}}>Veeges:</span>{food.veggies}</h2>
                </div>
              {/* <button style={buttonStyle} onClick={() => handleViewMoreClick(food)}>
                <FiArrowRight size={16} style={buttonIconStyle} />
                View More
              </button> */}
              <h2>Ordered By:{food.user.name}</h2>
          <button onClick={() => handleRemove(food)} className='btn-order' >
          Remove
        </button>
            </div>
          </div>
        ))
        :
        <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"90vh",color:"red",fontSize:"60px"}}>You have recieved no orders yet :(</h1>
        }
        
      </div>
    </div>
  );
}

export default Cuspizza;
