import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { FiFilter, FiSearch, FiClock, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


function FoodList() {
  const history=useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const [message,setmessage]=useState("")
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

//////////////////////////////////////////////
const [sortOrder, setSortOrder] = useState('ascending');
  const [filterActive, setFilterActive] = useState(false);

  const handleRecent = () => {
    // Perform recent operation
    console.log('Display recent items');
  };

  const handleSortAscending = () => {
    // Sort in ascending order
    setSortOrder('ascending');
    console.log('Sort in ascending order');
  };

  const handleSortDescending = () => {
    // Sort in descending order
    setSortOrder('descending');
    console.log('Sort in descending order');
  };

  const handleFilter = () => {
    // Toggle filter active state
    setFilterActive(!filterActive);
    console.log('Toggle filter:', !filterActive);
  };






//////////////////////////////////////////////////




  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/allpizzas");
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };


  const [searchText, setSearchText] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    if (searchText.trim() !== '') {
      const filteredResults = foods.filter((food) =>
        food.name.toLowerCase().includes(searchText.toLowerCase()) || food.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFoods(filteredResults);
    } else {
      setFilteredFoods(foods);
    }
  }, [searchText, foods]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
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

  const { id } = useParams();

  const navigate = useNavigate();

  const handleFoodItemClick = (food) => {
    // Handle click event for a food item
     ;
  };

  const handleViewMoreClick = (food) => {
    // Handle click event for the "View More" button
    navigate(`/singlepizza/${food._id}`);
  };

  const handlePlaceOrderClick = (food) => {
    
    let d={
      username:user.name,
      name: food.name,
      description: food.description,
      quantity: food.quantity,
      tags: food.tags,
      price: food.price,
      size: food.size,
      toppings: food.toppings,
      discount: food.discount,
      typeofpizza: food.typeofpizza,
      base: food.base,
      sauce: food.sauce,
      image:food.image
    }
   

    axios
  .post(`http://localhost:3001/orders/createorder/${user.name}`, d)
  .then((response) => {
    if (response.data.message === "error") {
      setmessage(`You have already placed this order ❌`);
      setTimeout(() => {
        setmessage("");
        navigate("/menu");
      }, 3000); 
    } else {
      setmessage(`${response.data.message} ✅`);
      setTimeout(() => {
        setmessage("");
        navigate("/menu");
      }, 3000);
    }
  })
  .catch((error) => {
    console.error(error);
  });

  };

  return (



<div style={styles.container}>

{message && <h1 style={styles.mess}>{message}</h1>}
       

    <div style={styles.content}>

    <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search food..."
              value={searchText}
              onChange={handleSearch}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
                width: '300px',
                outline: 'none',
              }}
            />
          </div>

      
      <div style={gridContainerStyle}>
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food) => (
          <div key={food._id} style={foodItemStyle} onClick={() => handleFoodItemClick(food)}>
            <img src={`http://localhost:3001/images/` + food.image} alt={food.name} style={foodItemImageStyle} />
            <h3 style={foodItemNameStyle}>{food.name}</h3>
            <p style={foodItemDescriptionStyle}>{food.description}</p>
            <p style={foodItemPriceStyle}>Price: ${food.price}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button style={buttonStyle} onClick={() => handleViewMoreClick(food)}>
                <FiArrowRight size={16} style={buttonIconStyle} />
                View More
              </button>
              <button style={buttonStyle} onClick={() => handlePlaceOrderClick(food)}>
                <FiShoppingCart size={16} style={buttonIconStyle} />
                Place Order
              </button>
            </div>
          </div>)))
        :(   <p style={{ textAlign: 'center', fontSize: '18px' }}>Nothing found</p>
      )}
      </div>
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"center",
    // alignItems: 'center',
  },

  // leftSidebar: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   marginBottom: '20px',
  // },
  section: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mess:{
     backgroundColor:"#10b3ff",
     width:"fit-content",
     margin:"auto",
     borderRadius:"5px",
     padding:"10px",
     marginTop:"10px",
     opacity:"0.7"
  },
  content: {
    flex:'2',
    margin:'40px',
    padding:'10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: '#ffcc00',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '8px',
  },
};


export default FoodList;
