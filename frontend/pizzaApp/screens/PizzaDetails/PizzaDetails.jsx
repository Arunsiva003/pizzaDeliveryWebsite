import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaComment, FaPaperPlane, FaUser } from 'react-icons/fa';

function PizzaDetails() {
  const [message,setmessage]=useState("")

  const [pizza, setPizza] = useState(null);
  const [comments,setcomments]=useState([])
  const [postcomments,setpostcomments]=useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/detailpizzaadmin/${id}`)
      .then((res) => setPizza(res.data))
      .catch((err) => console.log(err));
  }, [id]);
useEffect(()=>{
  axios.get(`http://localhost:3001/home/pizza/${id}`)
  .then((res) => {
    setcomments(res.data)
    console.log(res.data)
  }).catch((err)=>console.log(err))
},[])
const handleSendComment = () => {
  axios
    .post(`http://localhost:3001/home/pizza/${id}/${user.name}`, {
      comment: postcomments
    })
    .then((res) => {
      window.location.reload();
     })
    .catch((err) => console.log(err));
};

  const imageUrl = pizza ? `http://localhost:3001/images/${pizza.image}` : '';

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:`url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const detailsContainerStyle = {
    width: '80%',
    maxWidth: '1000px',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.02)',
    },
  };

  const imageStyle = {
    width: '100%',
    height:"400px",
    marginBottom: '20px',
    borderRadius: '10px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const descriptionStyle = {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#555',
  };

  const infoItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    color: '#777',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px',
    color: '#333',
  };

  const valueStyle = {
    color: '#555',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  };

  const buttonStyle = {
    padding: '15px 30px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    ':hover': {
      backgroundColor: '#4e555a',
    },
  };

  const handlePlaceOrder = () => {
    // Handle placing an order logic here
    let d={
      username:user.name,
      name: pizza.name,
      description: pizza.description,
      quantity: pizza.quantity,
      tags: pizza.tags,
      price: pizza.price,
      size: pizza.size,
      toppings: pizza.toppings,
      discount: pizza.discount,
      typeofpizza: pizza.typeofpizza,
      base: pizza.base,
      sauce: pizza.sauce,
      image:pizza.image
    }
   

    axios
  .post(`http://localhost:3001/orders/createorder/${user.name}`, d)
  .then((response) => {
    if (response.data.message === "error") {
      setmessage("You have already placed this order");
      setTimeout(() => {
        setmessage("");
        navigate("/menu");
      }, 3000); 
    } else {
      setmessage(response.data.message);
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

  const handleGoBack = () => {
    navigate('/menu'); 
  };

  return (
    <div style={containerStyle}>
      {message && <h1>{message}</h1>}
      {pizza ? (
        <div style={detailsContainerStyle}>
          <img src={"http://localhost:3001/images/"+pizza.image} alt={pizza.name} style={imageStyle} />
          <h2 style={titleStyle}>{pizza.name}</h2>
          <p style={descriptionStyle}>{pizza.description}</p>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Price:</span>
            <span style={valueStyle}>${pizza.price}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Quantity:</span>
            <span style={valueStyle}>{pizza.quantity}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Size:</span>
            <span style={valueStyle}>{pizza.size}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Toppings:</span>
            <span style={valueStyle}>{pizza.toppings}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Type of Pizza:</span>
            <span style={valueStyle}>{pizza.typeofpizza}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Base:</span>
            <span style={valueStyle}>{pizza.base}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Sauce:</span>
            <span style={valueStyle}>{pizza.sauce}</span>
          </div>
          <div style={infoItemStyle}>
            <span style={labelStyle}>Status:</span>
            <span style={valueStyle}>{pizza.status}</span>
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handlePlaceOrder}>
              Place Order
            </button>
            <button style={backButtonStyle} onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div>
          <input
          type="text"
          placeholder="Leave your comment here"
          name="comment"
          value={postcomments}
          onChange={(e) => setpostcomments(e.target.value)}
          style={{
            margin:'40px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
            marginRight: '10px',
          }}/>
      <button
          onClick={handleSendComment}
          style={{
            padding: '10px',
            borderRadius: '5px',
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FaPaperPlane style={{ marginRight: '5px' }} />
          Send
        </button> {/* Add onClick event handler */}
    </div>
    <div>
        {comments.map((comment, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              borderRadius: '5px',
              borderBottom : '1px solid #ccc',
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FaUser
              style={{
                marginRight: '10px',
                fontSize: '18px',
                color: '#2196f3',
              }}
            />
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                {comment.username}
              </p>
              <p>{comment.comment}</p>
              <p
                style={{
                  fontSize: '12px',
                  color: '#777',
                }}
              >
                Created At: {comment.createdat}
              </p>
            </div>
          </div>
        ))}
      </div>
        </div>
      ) : (
        <p>Loading pizza details...</p>
      )}
    </div>
  );
}

export default PizzaDetails;
