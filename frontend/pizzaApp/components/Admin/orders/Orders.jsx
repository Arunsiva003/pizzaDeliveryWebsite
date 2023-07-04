import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import price from './../../../assets/images/icons8-price-50.png';
import pizza from './../../../assets/images/icons8-pizza-50.png';
import './Orders.css'
function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setmessage] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/orders/myorders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStatusChange = (event, orderId,ordname) => {
    const status = event.target.value;

    // Call your API endpoint with the selected status and order ID
    axios
      .post(`http://localhost:3001/orders/statuschange/${status}/${orderId}/${ordname}`)
      .then((res) => {
        console.log(res.data.message);
        setOrders(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order._id === orderId) {
              return { ...order, status };
            }
            return order;
          });
          return updatedOrders;
        });
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (ord) => {
    axios
      .post(`http://localhost:3001/orders/clearorder/${ord._id}`)
      .then((res) => {
        
        setmessage(res.data.message);
        setTimeout(() => {
          setmessage("");
        }, 3000);
        window.location.reload();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="body-admin">
      <nav className="nav-admin">
        <Link className="spl" to="/admin">
          Admin
        </Link>
        <Link className="nav-t" to="/createpizzaadmin">
          Create Pizza
        </Link>
      </nav>
      {message && <h1>{message}</h1>}
      <div className="admin-contianer">
        {orders.length !=0 ?orders.map((ord) => (
          <div key={ord._id} className="pizza-block">
            <img
              className="img-tag"
              width="100px"
              height="200px"
              src={`http://localhost:3001/images/` + ord.image}
              alt="images"
            />
            <h1 className="name-pizza" style={{ color: 'red' }}>
              {ord.name}
            </h1>
            <h5 style={{ marginRight: 'auto', paddingLeft: '20px', fontSize: '20px' }}>
              Status: {ord.status}
            </h5>
            <h5 style={{ marginLeft: 'auto', paddingRight: '20px', fontSize: '20px' }}>
              Type: {ord.typeofpizza}
            </h5>
            <h4>username: {ord.username}</h4>
            <hr className="hrtag" />
            <div className="pqtype">
              <h3 className="pqh3">
                <img width="20px" style={{ margin:"2px" }} src={price} />
                {/* <br /> */}
                Price: <span style={{ color: 'red', fontSize: '20px' }}>${ord.price}</span>
              </h3>
              <h3 className="pqh3">
                <img width="20px" style={{margin:"1px" }} src={pizza} />
                {/* <br /> */}
                Quantity: <span style={{ color: 'red', fontSize: '25px' }}>{ord.quantity}</span>
              </h3>
              <h3 className="pqh3">Tags: #{ord.tags}</h3>
            </div>
            <h3 className="des">{ord.description}</h3>
            <div className='order-button-contain'>
              <select
                id="status"
                value={ord.status}
                onChange={(event) => handleStatusChange(event, ord._id,ord.username)}
              >
                <option value="">{ord.status}</option>
                <option value="accepted">Accepted</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={() => handleRemove(ord)} className='btn-order' >
                Remove
              </button>
            </div>
          </div>
        )) :<h1 style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"90vh",color:"red",fontSize:"60px"}}>You have recieved no orders yet :(</h1>}
      </div>
    </div>
  );
}

export default Orders;
