import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { FiCheckCircle } from 'react-icons/fi';

function Cartuser() {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [myorders, setMyOrders] = useState([]);
  const [message, setmessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders/userorders/${user.name}`)
      .then((res) => {
        setMyOrders(res.data);
        calculateTotalAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const calculateTotalAmount = (orders) => {
    const amount = orders.reduce((total, ord) => total + ord.price*ord.quantity, 0);
    console.log(amount)
    setTotalAmount(amount);
  };

  const handleMenuClick = () => {
    history("/menu");
  }
  const handleRemove = (ord) => {
    axios
      .post(`http://localhost:3001/orders/clearorder/${ord._id}/${user.name}`)
      .then((res) => {
        const updatedOrders = myorders.filter((order) => order._id !== ord._id);
        setMyOrders(updatedOrders);
        calculateTotalAmount(updatedOrders);
        setmessage(res.data.message);
        setTimeout(() => {
          setmessage("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuantityChange = (ord, value) => {
    const updatedOrders = myorders.map((order) => {
      if (order._id === ord._id) {
        const updatedQuantity = order.quantity + value;
        return {
          ...order,
          quantity: updatedQuantity > 0 ? updatedQuantity : 1,
        };
      }
      return order;
    });
  
    setMyOrders(updatedOrders);
    calculateTotalAmount(updatedOrders);
  };

  const handleProceedToPay = () => {
    history(`/paymentgate?totalAmount=${totalAmount}`);
    console.log('Proceed to Pay');
    
  };

  return (
    <>
      <Navbar/>
    <div style={{  background:`url("../../assets/images/entry2.jpg")`,
  backgroundSize:'cover',height:"fit-content"}}>
    <div style={cartContainerStyle}>
    {message && (
  <div
    style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'green',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:'10',
    }}
  >
    <FiCheckCircle style={{ marginRight: '5px' }} />
    {message}
  </div>
)}      <h1 style={pageTitleStyle}>Your Cart</h1>

      {myorders.length !== 0 ? (
        myorders.map((ord) => (
          <div key={ord._id} style={cartItemStyle}>
            <img
              className="img-tag"
              width="100px"
              height="200px"
              src={`http://localhost:3001/images/` + ord.image}
              alt="images"
              style={cartItemImageStyle}
            />
            <div style={cartItemDetailsStyle}>
              <h2 style={cartItemNameStyle}>{ord.name}</h2>
              <p style={cartItemPriceStyle}>Price: ${ord.price}</p>
              <div style={quantityButtonContainerStyle}>
                <button
                  onClick={() => handleQuantityChange(ord, -1)}
                  style={quantityButtonStyle}
                >
                  -
                </button>
                <span style={quantityTextStyle}>{ord.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(ord, 1)}
                  style={quantityButtonStyle}
                >
                  +
                </button>
              </div>
              
              <p style={{margin: "10px", textTransform: 'capitalize', color: (ord.status === 'available' ? 'green' : ord.status === 'delivered' ? 'blue' : 'red')}}>{ord.status}</p>

              <div>
              {ord.status=="delivered" || ord.status=="cancelled" ?<div>
              <button onClick={() => handleRemove(ord)} style={removeButtonStyle}>
                Remove
              </button>
              </div>:<button onClick={() => handleRemove(ord)} style={removeButtonStyle}>
                Cancel Order
              </button>}
            </div>
            </div>
            
          </div>
        ))
      ) : (
        <div style={styles.container}>
      <div style={styles.iconContainer}>
        <i className="fa fa-shopping-cart" style={styles.icon}></i>
      </div>
      <h2 style={styles.title}>Your Cart is Empty</h2>
      <p style={styles.description}>Start adding items to your cart to see them here.</p>
      <button onClick={handleMenuClick} style={menuButtonstyle}>Menu</button>
    </div>
      )}
      
      {myorders.length !== 0 && (
        <div style={proceedToPayContainerStyle}>
          <h2 style={totalAmountText}>Total Amount: ${totalAmount}</h2>
          <button onClick={handleProceedToPay} style={proceedToPayButtonStyle}>
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
// Styles

const menuButtonstyle = {
  backgroundColor: 'orange',
  padding: '5px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '20px',
  margin:'20px'
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  iconContainer: {
    marginBottom: "20px",
  },
  icon: {
    fontSize: "64px",
    color: "#ccc",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    color: "#888",
  },
};


const cartContainerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',

};

const pageTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  display:'flex',
  justifyContent:'center',
  color:'white'
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  border: '1px solid #ddd',
  padding: '10px',
  boxShadow: '0px 2px 4px rgba(270, 270, 270, 1)',
  borderRadius: '10px',
  backgroundColor:'rgba(0,0,0,0.8)'

};


const cartItemImageStyle = {
  width: '200px',
  height: '200px',
  marginRight: '20px',
};

const cartItemDetailsStyle = {
  flex: '1',
};

const cartItemNameStyle = {
  color: 'white',
  fontSize: '20px',
  marginBottom: '10px',
};

const cartItemPriceStyle = {
  fontSize: '16px',
  color: 'white',
};

const quantityButtonContainerStyle = {
  // display: 'flex',
  // alignItems: 'center',
   margin: '10px',
};

const quantityButtonStyle = {
  backgroundColor: '#eee',
  color: '#555',
  padding: '5px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '20px',
};

const quantityTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 10px',
  color:'white'
};

const removeButtonStyle = {
  backgroundColor: '#ff0000',
  color: '#fff',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const emptyCartStyle = {
  textAlign: 'center',
  marginTop: '100px',
};

const proceedToPayContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '50px',
};

const totalAmountText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color:'white',
  backgroundColor:'black',
  padding:'10px',
  boxShadow: '0px 1px 2px rgba(270, 270, 270, 1)',
  borderRadius: '10px',
  backgroundColor:'rgba(0,0,0,0.8)'
};

const proceedToPayButtonStyle = {
  backgroundColor: '#ff9900',
  color: '#fff',
  padding: '15px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize:'20px'
};

export default Cartuser;
